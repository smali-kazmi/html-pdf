# html-pdf-chrome

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

> HTML to PDF converter using Puppeteer and headless Chrome - a modern replacement for the deprecated [node-html-pdf](https://github.com/marcbachmann/node-html-pdf)

## Why this library?

The original `node-html-pdf` library relied on PhantomJS, which has been deprecated for years. This library provides a **drop-in replacement** with the same API, but uses modern headless Chrome via Puppeteer instead.

## Features

- ✅ **Same API** as node-html-pdf for easy migration
- ✅ Uses modern **Puppeteer** and **headless Chrome**
- ✅ Support for complex CSS and modern web standards
- ✅ Headers and footers support
- ✅ Custom page sizes and orientations
- ✅ Async/await and callback support
- ✅ Generate PDFs from HTML strings, files, or URLs
- ✅ Output to file, buffer, or stream
- ✅ TypeScript definitions included

## Installation

```bash
npm install html-pdf-chrome
```

Or install globally for CLI usage:

```bash
npm install -g html-pdf-chrome
```

## Quick Start

```javascript
const fs = require('fs');
const pdf = require('html-pdf-chrome');
const html = fs.readFileSync('./input.html', 'utf8');

const options = { format: 'Letter' };

pdf.create(html, options).toFile('./output.pdf', function(err, res) {
  if (err) return console.log(err);
  console.log(res); // { filename: '/path/to/output.pdf' }
});
```

## 📄 Example PDFs

See real-world output examples from this library:

- **[Basic Example](examples/output/basic-example.pdf)** (30KB) - Simple HTML to PDF conversion
- **[Header & Footer Example](examples/output/header-footer-example.pdf)** (48KB) - Professional document with headers/footers
- **[Invoice Example](examples/output/invoice-example.pdf)** (100KB) - Complex invoice with tables and styling
- **[Annual Report Example](examples/output/annual-report-example.pdf)** (534KB) - Multi-page report with images, tables, charts, and custom headers/footers

All example source code is available in the [examples/](examples/) directory.

## API

### pdf.create(html, [options])

Creates a new PDF document instance.

**Parameters:**
- `html` (string): HTML content as a string
- `options` (object, optional): Configuration options

**Returns:** `PDFDocument` instance

### Methods

#### .toFile([filepath,] callback)

Generates PDF and saves to a file.

```javascript
pdf.create(html, options).toFile('./output.pdf', function(err, res) {
  console.log(res.filename);
});
```

#### .toBuffer(callback)

Generates PDF and returns as a Buffer.

```javascript
pdf.create(html).toBuffer(function(err, buffer){
  console.log('PDF buffer:', buffer);
});
```

#### .toStream(callback)

Generates PDF and returns as a Stream.

```javascript
pdf.create(html).toStream(function(err, stream){
  stream.pipe(fs.createWriteStream('./output.pdf'));
});
```

### Async/Await Support

All methods return promises and support async/await:

```javascript
async function generatePDF() {
  const buffer = await pdf.create(html, options).toBuffer();
  const result = await pdf.create(html, options).toFile('./output.pdf');
}
```

## Options

```javascript
const options = {
  // Export options
  directory: "/tmp",       // Output directory (default: '/tmp')

  // Page size - use either format OR width/height
  format: "Letter",        // A3, A4, A5, Legal, Letter, Tabloid
  width: "8in",           // Custom width (units: mm, cm, in, px)
  height: "10.5in",       // Custom height (units: mm, cm, in, px)
  
  orientation: "portrait", // portrait or landscape

  // Margins
  border: "0",            // default is 0, units: mm, cm, in, px
  // OR
  border: {
    top: "2in",
    right: "1in",
    bottom: "2in",
    left: "1.5in"
  },

  // Header and footer
  header: {
    height: "45mm",
    contents: '<div style="text-align: center;">Header Content</div>'
  },
  footer: {
    height: "28mm",
    contents: '<div>Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>'
  },

  // Rendering options
  base: "file:///path/to/assets/", // Base path for loading files
  printBackground: true,            // Print background graphics (default: true)
  preferCSSPageSize: false,         // Use CSS-defined page size
  
  // Timing
  timeout: 30000,          // Timeout in milliseconds (default: 30000)
  renderDelay: 1000,       // Wait time before rendering (milliseconds)
  // OR
  renderDelay: "manual",   // Wait for custom event (see below)

  // HTTP options
  httpHeaders: {
    "Authorization": "Bearer TOKEN"
  },
  httpCookies: [
    {
      name: "session",
      value: "abc123",
      domain: "localhost",
      path: "/",
      httponly: true,
      secure: false
    }
  ],

  // Puppeteer options
  puppeteerArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
  headless: true,          // Run in headless mode (default: true)
  
  // Zoom
  zoomFactor: 1            // Page zoom factor (default: 1)
};
```

## Examples

### Basic PDF Generation

```javascript
const pdf = require('html-pdf-chrome');

const html = '<h1>Hello World</h1>';
const options = { format: 'A4' };

pdf.create(html, options).toFile('./output.pdf', (err, res) => {
  if (err) return console.error(err);
  console.log('PDF created:', res.filename);
});
```

### With CSS Styling

```javascript
const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial; margin: 40px; }
    h1 { color: #333; }
    .box { background: #f0f0f0; padding: 20px; }
  </style>
</head>
<body>
  <h1>Styled Document</h1>
  <div class="box">This is a styled box</div>
</body>
</html>
`;

pdf.create(html, { format: 'Letter' }).toFile('./styled.pdf');
```

### Headers and Footers

```javascript
const options = {
  format: 'A4',
  border: { top: '20mm', bottom: '20mm' },
  header: {
    height: '15mm',
    contents: '<div style="text-align:center;">My Header</div>'
  },
  footer: {
    height: '15mm',
    contents: '<div style="text-align:center;">Page <span class="pageNumber"></span></div>'
  }
};

pdf.create(html, options).toFile('./with-headers.pdf');
```

### Manual Render Timing

For dynamically loaded content:

```javascript
const html = `
<html>
<body>
  <div id="content">Loading...</div>
  <script>
    setTimeout(() => {
      document.getElementById('content').innerHTML = 'Loaded!';
      document.dispatchEvent(new Event('pdf-render-ready'));
    }, 2000);
  </script>
</body>
</html>
`;

const options = { renderDelay: 'manual' };
pdf.create(html, options).toFile('./dynamic.pdf');
```

### Using Streams

```javascript
pdf.create(html).toStream((err, stream) => {
  if (err) return console.error(err);
  stream.pipe(fs.createWriteStream('./output.pdf'));
});
```

### Async/Await

```javascript
async function generateReport() {
  try {
    const result = await pdf.create(html, options).toFile('./report.pdf');
    console.log('Report generated:', result.filename);
  } catch (error) {
    console.error('Error:', error);
  }
}
```

## Command Line Usage

```bash
# Basic usage
html-pdf-chrome input.html output.pdf

# With options
html-pdf-chrome input.html output.pdf --format A4 --orientation landscape
```

## Migration from node-html-pdf

This library is designed as a drop-in replacement. In most cases, you can simply:

1. Replace `require('html-pdf')` with `require('html-pdf-chrome')`
2. Update your `package.json` dependencies

**Note:** Some PhantomJS-specific options are not supported. See the options table above for supported options.

## Differences from node-html-pdf

- Uses Puppeteer/Chrome instead of PhantomJS
- Better CSS3 and modern web standards support
- No `phantomPath` or `phantomArgs` options (use `puppeteerArgs` instead)
- Slightly different header/footer implementation
- Better performance and reliability

## Requirements

- Node.js >= 14.0.0
- Puppeteer will download Chromium automatically on install (~170MB)

## TypeScript

TypeScript definitions are included:

```typescript
import * as pdf from 'html-pdf-chrome';

const html: string = '<h1>Hello</h1>';
const options: pdf.CreateOptions = { format: 'A4' };

pdf.create(html, options).toFile('./output.pdf');
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License

## Acknowledgments

- Inspired by [node-html-pdf](https://github.com/marcbachmann/node-html-pdf) by Marc Bachmann
- Built with [Puppeteer](https://pptr.dev/)

## Support

If you encounter any issues or have questions, please [open an issue](https://github.com/smali-kazmi/html-pdf/issues) on GitHub.
