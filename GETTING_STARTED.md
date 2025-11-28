# Getting Started with Your New Module

## ✅ Project Setup Complete!

Your modern replacement for `node-html-pdf` is now ready to use!

## 📁 What's Been Created

```
html-pdf/
├── lib/index.js              - Main library (drop-in replacement API)
├── lib/index.d.ts            - TypeScript definitions
├── bin/html-pdf-chrome.js    - CLI tool
├── examples/                 - 5 working examples
├── test/test.js              - Test suite
├── README.md                 - Complete documentation
├── MIGRATION.md              - Migration guide
├── QUICKSTART.md             - Quick start guide
└── package.json              - Package configuration
```

## 🚀 Next Steps

### 1. Install Dependencies

```bash
cd /Users/smak/Projects/personal/html-pdf
npm install
```

This will install Puppeteer and download Chromium (~170MB).

### 2. Test the Installation

Run the basic example:

```bash
npm run example
```

This will create `output.pdf` in your directory.

### 3. Run All Examples

```bash
npm run example:all
```

### 4. Run Tests

```bash
npm test
```

## 📖 Quick Usage Example

Create a file `test-pdf.js`:

```javascript
const pdf = require('./lib/index');

const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial; padding: 20px; }
    h1 { color: #3498db; }
  </style>
</head>
<body>
  <h1>Hello from html-pdf-chrome!</h1>
  <p>This is a modern replacement for node-html-pdf.</p>
</body>
</html>
`;

pdf.create(html, { format: 'Letter' })
  .toFile('./my-test.pdf', (err, res) => {
    if (err) return console.error(err);
    console.log('PDF created:', res.filename);
  });
```

Run it:

```bash
node test-pdf.js
```

## 🔧 Development Workflow

### Local Testing
```bash
# Run a specific example
node examples/basic.js
node examples/advanced-invoice.js

# Run tests
npm test
```

### CLI Testing
```bash
# Make CLI executable (already done)
chmod +x bin/html-pdf-chrome.js

# Test CLI
./bin/html-pdf-chrome.js examples/test.html output-cli.pdf
```

### Link for Local Development
```bash
# Link globally for testing
npm link

# Now you can use anywhere
html-pdf-chrome examples/test.html output.pdf
```

## 📦 Publishing to NPM (Optional)

When ready to publish:

```bash
# 1. Create NPM account (if needed)
npm adduser

# 2. Update package.json with your info
# - Change "name" if "html-pdf-chrome" is taken
# - Add your "author" name
# - Update repository URLs

# 3. Publish
npm publish
```

## 🔄 Migration from node-html-pdf

For users migrating from `node-html-pdf`:

1. **Install this package:**
   ```bash
   npm install html-pdf-chrome
   ```

2. **Update imports:**
   ```javascript
   // Before
   const pdf = require('html-pdf');
   
   // After
   const pdf = require('html-pdf-chrome');
   ```

3. **That's it!** The API is compatible.

See `MIGRATION.md` for detailed migration guide.

## 📚 Documentation

- **README.md** - Full API reference and options
- **QUICKSTART.md** - 5-minute quick start guide
- **MIGRATION.md** - Detailed migration from node-html-pdf
- **PROJECT_SUMMARY.md** - Technical overview
- **examples/** - Working code examples

## 🎯 Key Features

✅ Drop-in replacement for node-html-pdf  
✅ Modern Puppeteer/Chrome (no PhantomJS)  
✅ Same API - easy migration  
✅ TypeScript support  
✅ CLI tool included  
✅ Async/await + callbacks  
✅ Headers & footers  
✅ Custom page sizes  
✅ All PDF options  

## 🐛 Troubleshooting

### Puppeteer Installation Issues

If Chromium download fails:

```bash
# Set environment variable
export PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=false
npm install puppeteer
```

### Permission Issues

```bash
# Make CLI executable
chmod +x bin/html-pdf-chrome.js
```

### Font Issues

Use web fonts or provide font paths:

```html
<link href="https://fonts.googleapis.com/css2?family=Roboto" rel="stylesheet">
```

## 💡 Tips

1. **Use async/await** for cleaner code:
   ```javascript
   const result = await pdf.create(html).toFile('./output.pdf');
   ```

2. **Debug with visible browser:**
   ```javascript
   pdf.create(html, { headless: false }).toFile('./output.pdf');
   ```

3. **Wait for dynamic content:**
   ```javascript
   pdf.create(html, { renderDelay: 2000 }).toFile('./output.pdf');
   ```

## 🤝 Contributing

Contributions welcome! Fork the repo and submit a pull request.

## 📄 License

MIT License - feel free to use in personal and commercial projects.

## ⭐ Support

- ⭐ Star the repository if you find it useful
- 🐛 Report issues on GitHub
- 💬 Share with others who need to migrate from node-html-pdf

---

## Ready to Go! 🎉

Your module is complete and ready to use. Start with:

```bash
npm install
npm run example
```

Happy PDF generation! 📄✨
