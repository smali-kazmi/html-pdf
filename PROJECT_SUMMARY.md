# Project Summary: html-pdf-chrome

## Overview

A modern Node.js module that replicates the functionality of the deprecated `node-html-pdf` package, using Puppeteer and headless Chrome instead of PhantomJS.

## Project Structure

```
html-pdf/
├── bin/
│   └── html-pdf-chrome.js          # CLI executable
├── lib/
│   ├── index.js                     # Main library implementation
│   └── index.d.ts                   # TypeScript definitions
├── examples/
│   ├── basic.js                     # Basic usage example
│   ├── buffer-stream.js             # Buffer and stream examples
│   ├── from-file.js                 # Reading HTML from file
│   ├── header-footer.js             # Headers and footers example
│   ├── advanced-invoice.js          # Complex invoice generation
│   └── test.html                    # Sample HTML for testing
├── test/
│   └── test.js                      # Test suite
├── CHANGELOG.md                     # Version history
├── LICENSE                          # MIT License
├── MIGRATION.md                     # Migration guide from node-html-pdf
├── QUICKSTART.md                    # Quick start guide
├── README.md                        # Main documentation
└── package.json                     # Package configuration
```

## Key Features Implemented

### Core Functionality
- ✅ **Same API** as node-html-pdf for drop-in replacement
- ✅ **Puppeteer Integration** - Uses modern headless Chrome
- ✅ **Multiple Output Formats**
  - `.toFile()` - Save to file
  - `.toBuffer()` - Get as Buffer
  - `.toStream()` - Get as Stream
- ✅ **Async/Await Support** - All methods return promises
- ✅ **Callback Support** - Backward compatible callback API

### Options Support
- ✅ Page formats (A3, A4, A5, Legal, Letter, Tabloid)
- ✅ Custom page sizes (width/height)
- ✅ Page orientation (portrait/landscape)
- ✅ Custom margins/borders
- ✅ Headers and footers with templating
- ✅ HTTP headers and cookies
- ✅ Render delay options (fixed delay or manual event)
- ✅ Zoom factor
- ✅ Base URL for assets
- ✅ Print background graphics
- ✅ Timeout configuration

### Developer Experience
- ✅ TypeScript definitions included
- ✅ CLI tool for command-line usage
- ✅ Comprehensive documentation
- ✅ Multiple working examples
- ✅ Migration guide from node-html-pdf
- ✅ Test suite

## Installation

```bash
npm install html-pdf-chrome
```

Or globally for CLI:

```bash
npm install -g html-pdf-chrome
```

## Basic Usage

```javascript
const pdf = require('html-pdf-chrome');
const html = '<h1>Hello World</h1>';

// Method 1: Async/await
const buffer = await pdf.create(html).toBuffer();
const result = await pdf.create(html).toFile('./output.pdf');

// Method 2: Callbacks
pdf.create(html).toFile('./output.pdf', (err, res) => {
  console.log(res.filename);
});

// Method 3: Legacy API (backward compatibility)
pdf.create(html, options, (err, buffer) => {
  // buffer returned
});
```

## CLI Usage

```bash
html-pdf-chrome input.html output.pdf --format A4 --orientation landscape
```

## API Compatibility Matrix

| Feature | node-html-pdf | html-pdf-chrome | Status |
|---------|---------------|-----------------|--------|
| `.create()` | ✅ | ✅ | ✅ Compatible |
| `.toFile()` | ✅ | ✅ | ✅ Compatible |
| `.toBuffer()` | ✅ | ✅ | ✅ Compatible |
| `.toStream()` | ✅ | ✅ | ✅ Compatible |
| `format` option | ✅ | ✅ | ✅ Compatible |
| `border` option | ✅ | ✅ | ✅ Compatible |
| `header/footer` | ✅ | ✅ | ⚠️ Slightly different |
| `renderDelay` | ✅ | ✅ | ✅ Compatible |
| `httpHeaders` | ✅ | ✅ | ✅ Compatible |
| PhantomJS options | ✅ | ❌ | ⚠️ Use puppeteerArgs |

## Technical Implementation

### Core Technologies
- **Puppeteer** - Browser automation
- **Node.js** - Runtime (>=14.0.0)
- **Headless Chrome** - PDF rendering engine

### Architecture
```
User Code
    ↓
html-pdf-chrome API
    ↓
PDFDocument Class
    ↓
Puppeteer
    ↓
Headless Chrome
    ↓
PDF Output
```

### Key Classes and Methods

#### PDFDocument Class
- `constructor(html, options)` - Initialize document
- `toBuffer(callback)` - Generate PDF as buffer
- `toFile(filepath, callback)` - Generate PDF to file
- `toStream(callback)` - Generate PDF as stream
- `_parseOptions(options)` - Process user options
- `_getPuppeteerPDFOptions()` - Convert to Puppeteer format
- `_processHTML(page)` - Prepare HTML for rendering

#### Exported Functions
- `create(html, options, callback)` - Main factory function

## Testing

Run tests:
```bash
npm test
```

Run examples:
```bash
npm run example
npm run example:all
```

## Performance Considerations

### Memory Usage
- Chrome instance: ~100MB
- Additional per-page: ~20-50MB
- Can reuse browser instances for better performance

### Speed
- Initial Chrome launch: ~1-2 seconds
- PDF generation: ~0.5-2 seconds per page
- Reusing browser instances reduces overhead

### Optimization Tips
1. Reuse browser instances for multiple PDFs
2. Use `headless: true` for production
3. Set appropriate `timeout` values
4. Consider page pooling for high volume

## Differences from node-html-pdf

### Advantages
- ✅ Modern, maintained codebase
- ✅ Better CSS3 support
- ✅ Better JavaScript support
- ✅ Active browser engine (Chrome)
- ✅ Better debugging capabilities
- ✅ More reliable rendering

### Trade-offs
- ⚠️ Larger package size (~170MB with Chromium)
- ⚠️ Slightly higher memory usage
- ⚠️ Slightly slower initial startup

### Migration Path
1. Install html-pdf-chrome
2. Replace `require('html-pdf')` with `require('html-pdf-chrome')`
3. Update PhantomJS-specific options (if any)
4. Test your PDF output
5. Done! 🎉

## Documentation Files

- **README.md** - Main documentation with full API reference
- **QUICKSTART.md** - Get started in 5 minutes
- **MIGRATION.md** - Detailed migration guide from node-html-pdf
- **CHANGELOG.md** - Version history and changes
- **LICENSE** - MIT License

## Examples Provided

1. **basic.js** - Simple PDF generation
2. **buffer-stream.js** - Working with buffers and streams
3. **from-file.js** - Loading HTML from file
4. **header-footer.js** - Using headers and footers
5. **advanced-invoice.js** - Complex invoice with styling
6. **test.html** - Sample HTML file for testing

## Future Enhancements

Potential features for future versions:
- Image format support (PNG, JPEG)
- Batch processing utilities
- Template system integration
- Performance monitoring
- More granular error handling
- Browser instance pooling
- Progress callbacks for large documents

## Requirements

- Node.js >= 14.0.0
- npm or yarn
- ~200MB disk space (including Chromium)

## License

MIT License - See LICENSE file for details

## Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Support

- GitHub Issues: Report bugs or request features
- Documentation: Check README.md and examples/
- Puppeteer Docs: For advanced Chrome features

## Acknowledgments

- Inspired by [node-html-pdf](https://github.com/marcbachmann/node-html-pdf) by Marc Bachmann
- Built with [Puppeteer](https://pptr.dev/) by Google Chrome team
- Community contributions and feedback

---

**Status**: ✅ Production Ready
**Version**: 1.0.0
**Last Updated**: November 28, 2025
