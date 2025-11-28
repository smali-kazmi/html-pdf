# Quick Start Guide

Get up and running with html-pdf-chrome in 5 minutes!

## Installation

```bash
npm install html-pdf-chrome
```

## Your First PDF

Create a file called `generate-pdf.js`:

```javascript
const pdf = require('html-pdf-chrome');

const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial; padding: 20px; }
    h1 { color: #333; }
  </style>
</head>
<body>
  <h1>My First PDF!</h1>
  <p>Generated with html-pdf-chrome</p>
</body>
</html>
`;

pdf.create(html).toFile('./my-first-pdf.pdf', (err, res) => {
  if (err) return console.error(err);
  console.log('PDF created:', res.filename);
});
```

Run it:

```bash
node generate-pdf.js
```

🎉 You'll see `my-first-pdf.pdf` created!

## Common Use Cases

### 1. Convert HTML File to PDF

```javascript
const fs = require('fs');
const pdf = require('html-pdf-chrome');

const html = fs.readFileSync('./document.html', 'utf8');
pdf.create(html).toFile('./document.pdf');
```

### 2. Add Page Numbers

```javascript
const options = {
  footer: {
    height: '15mm',
    contents: '<div style="text-align: center;">Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>'
  }
};

pdf.create(html, options).toFile('./output.pdf');
```

### 3. Custom Page Size

```javascript
const options = {
  format: 'Letter',      // or A4, A5, Legal, etc.
  orientation: 'landscape',
  border: '20mm'
};

pdf.create(html, options).toFile('./output.pdf');
```

### 4. Generate to Buffer (for sending via email, upload, etc.)

```javascript
const buffer = await pdf.create(html).toBuffer();
// Now send buffer via email, upload to S3, etc.
```

### 5. Using Streams

```javascript
const stream = await pdf.create(html).toStream();
stream.pipe(fs.createWriteStream('./output.pdf'));
```

## Async/Await Style

```javascript
async function generateInvoice(data) {
  const html = `<h1>Invoice for ${data.customer}</h1>`;
  
  try {
    const result = await pdf.create(html).toFile('./invoice.pdf');
    console.log('Invoice created:', result.filename);
  } catch (error) {
    console.error('Error:', error);
  }
}
```

## Command Line Usage

Install globally:

```bash
npm install -g html-pdf-chrome
```

Use from terminal:

```bash
# Basic
html-pdf-chrome input.html output.pdf

# With options
html-pdf-chrome input.html output.pdf --format A4 --orientation landscape
```

## Common Options Quick Reference

```javascript
const options = {
  // Page format
  format: 'A4',              // A3, A4, A5, Legal, Letter, Tabloid
  orientation: 'portrait',   // or 'landscape'
  
  // Margins
  border: '10mm',           // all sides
  // or
  border: {
    top: '20mm',
    right: '15mm',
    bottom: '20mm',
    left: '15mm'
  },
  
  // Header/Footer
  header: {
    height: '20mm',
    contents: '<div>Header</div>'
  },
  footer: {
    height: '20mm',
    contents: '<div>Footer</div>'
  },
  
  // Rendering
  printBackground: true,     // print background colors/images
  renderDelay: 1000,        // wait 1 second before rendering
  timeout: 30000,           // 30 second timeout
  
  // HTTP
  httpHeaders: {
    'Authorization': 'Bearer token'
  }
};
```

## Troubleshooting

### PDF not generating?

Check for JavaScript errors in your HTML:

```javascript
const options = {
  headless: false  // Opens visible browser for debugging
};
```

### Fonts not showing?

Use web fonts or embed fonts properly:

```html
<link href="https://fonts.googleapis.com/css2?family=Roboto" rel="stylesheet">
```

### Images not loading?

Use absolute URLs or base64 encoded images:

```javascript
const options = {
  base: 'file:///path/to/assets/'  // Base path for relative URLs
};
```

## Next Steps

- Read the full [README.md](README.md) for all options
- Check out [examples/](examples/) for more code samples
- See [MIGRATION.md](MIGRATION.md) if migrating from node-html-pdf

## Need Help?

- [Report an issue](https://github.com/smali-kazmi/html-pdf/issues)
- Check [Puppeteer docs](https://pptr.dev/) for advanced features
