# Migration Guide: node-html-pdf → html-pdf-chrome

This guide will help you migrate from the deprecated `node-html-pdf` to `html-pdf-chrome`.

## Quick Migration

For most projects, migration is as simple as:

### 1. Update dependencies

```bash
npm uninstall html-pdf
npm install html-pdf-chrome
```

### 2. Update imports

```javascript
// Before
const pdf = require('html-pdf');

// After
const pdf = require('html-pdf-chrome');
```

That's it! The API is identical for basic usage.

## API Compatibility

### ✅ Fully Compatible

These work exactly the same:

```javascript
// Create PDF and save to file
pdf.create(html, options).toFile('./output.pdf', callback);

// Create PDF as buffer
pdf.create(html, options).toBuffer(callback);

// Create PDF as stream
pdf.create(html, options).toStream(callback);

// Legacy callback style
pdf.create(html, options, callback);
```

### ✅ Supported Options

| Option | node-html-pdf | html-pdf-chrome | Notes |
|--------|---------------|-----------------|-------|
| `format` | ✅ | ✅ | Same formats supported |
| `width` | ✅ | ✅ | Same |
| `height` | ✅ | ✅ | Same |
| `orientation` | ✅ | ✅ | Same |
| `border` | ✅ | ✅ | Same |
| `header` | ✅ | ✅ | Slightly different implementation |
| `footer` | ✅ | ✅ | Slightly different implementation |
| `base` | ✅ | ✅ | Same |
| `timeout` | ✅ | ✅ | Same |
| `renderDelay` | ✅ | ✅ | Same |
| `httpHeaders` | ✅ | ✅ | Same |
| `httpCookies` | ✅ | ✅ | Same |
| `zoomFactor` | ✅ | ✅ | Same |

### ⚠️ Changed Options

| Old Option (PhantomJS) | New Option (Puppeteer) | Notes |
|------------------------|------------------------|-------|
| `phantomPath` | N/A | Not needed - Puppeteer manages Chrome |
| `phantomArgs` | `puppeteerArgs` | Use Puppeteer/Chrome args instead |
| `script` | N/A | Not supported - use render events instead |
| `localUrlAccess` | N/A | Handled differently by Puppeteer |
| `type` | N/A | Only PDF supported (not png/jpeg) |
| `quality` | N/A | PDF only |
| `childProcessOptions` | N/A | Not needed |

### 📝 Option Migration Examples

#### Before (node-html-pdf)
```javascript
const options = {
  format: 'Letter',
  phantomPath: './phantomjs',
  phantomArgs: ['--ignore-ssl-errors=yes'],
  type: 'pdf'
};
```

#### After (html-pdf-chrome)
```javascript
const options = {
  format: 'Letter',
  puppeteerArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
  // type is always 'pdf'
};
```

## Header/Footer Differences

### node-html-pdf
Headers and footers could be in HTML or in options:

```javascript
// In HTML
<div id="pageHeader">Header</div>
<div id="pageFooter">Footer</div>

// In options
options.header = {
  height: '45mm',
  contents: '<div>Header</div>'
};
```

### html-pdf-chrome
Primarily use options (HTML method less reliable):

```javascript
options.header = {
  height: '45mm',
  contents: '<div>Header</div>'
};

options.footer = {
  height: '28mm',
  contents: '<div>Page <span class="pageNumber"></span></div>'
};
```

## Common Migration Issues

### Issue 1: PhantomJS-specific CSS

**Problem:** Some CSS that worked in PhantomJS may render differently.

**Solution:** Modern Chrome has better CSS support. Update your CSS to use standard properties.

```css
/* Before - PhantomJS quirks */
body {
  -webkit-print-color-adjust: exact;
}

/* After - Standard CSS */
body {
  print-color-adjust: exact;
  -webkit-print-color-adjust: exact; /* Keep for compatibility */
}
```

### Issue 2: Font Loading

**Problem:** Custom fonts may not load properly.

**Solution:** Ensure fonts are properly embedded or use web fonts with full URLs:

```html
<link href="https://fonts.googleapis.com/css2?family=Roboto" rel="stylesheet">
```

### Issue 3: Render Timing

**Problem:** Dynamic content may not be fully loaded.

**Solution:** Use `renderDelay` or manual render events:

```javascript
// Wait 2 seconds
options.renderDelay = 2000;

// Or wait for custom event
options.renderDelay = 'manual';

// Then in your HTML:
document.dispatchEvent(new Event('pdf-render-ready'));
```

## Performance Considerations

### node-html-pdf
- Faster initial startup
- Lower memory usage
- Single-threaded

### html-pdf-chrome
- Slightly slower initial startup (Chrome launch)
- Higher memory usage (~100MB per instance)
- Better parallel processing
- Can reuse browser instances for better performance

### Optimization Tips

For high-volume PDF generation:

```javascript
// Keep browser instance alive (advanced usage)
const puppeteer = require('puppeteer');

let browser = null;

async function generatePDF(html) {
  if (!browser) {
    browser = await puppeteer.launch({ headless: true });
  }
  
  const page = await browser.newPage();
  await page.setContent(html);
  const buffer = await page.pdf({ format: 'A4' });
  await page.close();
  
  return buffer;
}

// Clean up when done
process.on('exit', async () => {
  if (browser) await browser.close();
});
```

## Testing Your Migration

1. **Run existing tests** with the new library
2. **Visual comparison** - Generate PDFs with both libraries and compare
3. **Check file sizes** - Chrome PDFs may be slightly different sizes
4. **Verify CSS rendering** - Especially gradients, shadows, and fonts
5. **Test edge cases** - Large documents, special characters, images

## Feature Improvements

### Better CSS Support
- Flexbox works better
- Grid layout fully supported
- Modern CSS3 features
- Better font rendering

### Better JavaScript Support
- ES6+ support
- Modern APIs available
- Better async handling

### Debugging
```javascript
// Enable debugging
const options = {
  headless: false,  // Opens visible browser
  // ... other options
};
```

## Getting Help

If you encounter issues during migration:

1. Check the [README.md](README.md) for examples
2. Look at the [examples/](examples/) directory
3. Open an issue on GitHub
4. Check Puppeteer documentation for Chrome-specific features

## Rollback Plan

If you need to rollback temporarily:

```bash
npm uninstall html-pdf-chrome
npm install html-pdf@3.0.1
```

Note: PhantomJS is deprecated and unsupported, so plan to complete migration soon.
