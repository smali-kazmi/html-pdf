const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

class PDFDocument {
    constructor(html, options = {}) {
        this.html = html;
        this.options = this._parseOptions(options);
    }

    _parseOptions(options) {
        const defaults = {
            // Export options
            directory: '/tmp',

            // Page options
            format: 'A4',
            orientation: 'portrait',
            border: '0',

            // Puppeteer PDF options
            printBackground: true,
            preferCSSPageSize: false,

            // Script options
            timeout: 30000,
            renderDelay: 0,

            // HTTP options
            httpHeaders: {},
            httpCookies: [],

            // Puppeteer launch options
            puppeteerArgs: [],
            headless: true,

            // Base URL for loading assets
            base: null,

            // Zoom factor
            zoomFactor: 1,
        };

        const merged = { ...defaults, ...options };

        // Parse border
        if (typeof merged.border === 'string') {
            merged.border = {
                top: merged.border,
                right: merged.border,
                bottom: merged.border,
                left: merged.border,
            };
        }

        return merged;
    }

    _getPuppeteerPDFOptions() {
        const opts = {
            printBackground: this.options.printBackground,
            preferCSSPageSize: this.options.preferCSSPageSize,
            displayHeaderFooter: !!(this.options.header || this.options.footer),
        };

        // Handle page size
        if (this.options.format) {
            opts.format = this.options.format;
        } else if (this.options.width && this.options.height) {
            opts.width = this.options.width;
            opts.height = this.options.height;
        }

        // Handle orientation
        if (this.options.orientation === 'landscape') {
            opts.landscape = true;
        }

        // Handle margins
        if (this.options.border) {
            opts.margin = {
                top: this.options.border.top,
                right: this.options.border.right,
                bottom: this.options.border.bottom,
                left: this.options.border.left,
            };
        }

        // Handle header and footer
        if (this.options.header) {
            opts.headerTemplate = this._processHeaderFooter(this.options.header);
        }

        if (this.options.footer) {
            opts.footerTemplate = this._processHeaderFooter(this.options.footer);
        }

        return opts;
    }

    _processHeaderFooter(config) {
        if (typeof config === 'string') {
            return config;
        }

        if (config.contents) {
            if (typeof config.contents === 'string') {
                return config.contents;
            }
            // For now, use default content if object is provided
            // In a full implementation, we'd handle page-specific headers/footers
            return config.contents.default || '';
        }

        return '';
    }

    async _processHTML(page) {
        let html = this.html;

        // Extract and remove header/footer elements from HTML
        // This is a simplified version - full implementation would be more sophisticated
        html = html.replace(/<div[^>]*id="pageHeader[^"]*"[^>]*>.*?<\/div>/gs, '');
        html = html.replace(/<div[^>]*id="pageFooter[^"]*"[^>]*>.*?<\/div>/gs, '');

        // Set base URL if provided
        if (this.options.base) {
            await page.goto(this.options.base, { waitUntil: 'networkidle0' });
        }

        // Set zoom factor
        if (this.options.zoomFactor && this.options.zoomFactor !== 1) {
            await page.evaluateOnNewDocument(`
        Object.defineProperty(window, 'devicePixelRatio', {
          get: () => ${this.options.zoomFactor}
        });
      `);
        }

        // Set custom HTTP headers
        if (Object.keys(this.options.httpHeaders).length > 0) {
            await page.setExtraHTTPHeaders(this.options.httpHeaders);
        }

        // Set cookies
        if (this.options.httpCookies && this.options.httpCookies.length > 0) {
            await page.setCookie(...this.options.httpCookies);
        }

        // Set content
        await page.setContent(html, {
            waitUntil: 'networkidle0',
            timeout: this.options.timeout
        });

        // Apply render delay if specified
        if (this.options.renderDelay === 'manual') {
            // Wait for a custom event
            await page.evaluate(() => {
                return new Promise((resolve) => {
                    document.addEventListener('pdf-render-ready', resolve, { once: true });
                });
            });
        } else if (this.options.renderDelay > 0) {
            await new Promise(resolve => setTimeout(resolve, this.options.renderDelay));
        }
    }

    async toBuffer(callback) {
        let browser;
        try {
            const launchOptions = {
                headless: this.options.headless,
                args: this.options.puppeteerArgs,
            };

            browser = await puppeteer.launch(launchOptions);
            const page = await browser.newPage();

            await this._processHTML(page);

            const pdfOptions = this._getPuppeteerPDFOptions();
            const buffer = await page.pdf(pdfOptions);

            await browser.close();

            if (callback) {
                callback(null, buffer);
            }
            return buffer;
        } catch (error) {
            if (browser) {
                await browser.close();
            }
            if (callback) {
                callback(error);
            } else {
                throw error;
            }
        }
    }

    async toFile(filename, callback) {
        // Handle optional filename parameter
        let filepath = filename;
        let cb = callback;

        if (typeof filename === 'function') {
            cb = filename;
            filepath = path.join(this.options.directory, `output_${Date.now()}.pdf`);
        }

        // Ensure directory exists
        const dir = path.dirname(filepath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        try {
            const buffer = await this.toBuffer();
            fs.writeFileSync(filepath, buffer);

            const result = { filename: filepath };

            if (cb) {
                cb(null, result);
            }
            return result;
        } catch (error) {
            if (cb) {
                cb(error);
            } else {
                throw error;
            }
        }
    }

    async toStream(callback) {
        const { Readable } = require('stream');

        try {
            const buffer = await this.toBuffer();
            const stream = new Readable();
            stream.push(buffer);
            stream.push(null); // End of stream

            if (callback) {
                callback(null, stream);
            }
            return stream;
        } catch (error) {
            if (callback) {
                callback(error);
            } else {
                throw error;
            }
        }
    }
}

function create(html, options, callback) {
    // Handle backward compatibility: create(html, callback)
    if (typeof options === 'function') {
        callback = options;
        options = {};
    }

    const doc = new PDFDocument(html, options);

    // If callback provided, use legacy API (returns buffer)
    if (callback) {
        doc.toBuffer(callback);
        return;
    }

    // Return document object for chaining
    return doc;
}

module.exports = {
    create,
    PDFDocument,
};
