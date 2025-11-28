# 📚 Documentation Index

Welcome to the html-pdf-chrome documentation! This index will help you find the right information quickly.

## 🚀 Quick Navigation

### New Users - Start Here!
1. **[QUICKSTART.md](QUICKSTART.md)** ⭐ - Get started in 5 minutes
2. **[examples/basic.js](examples/basic.js)** - Your first PDF

### Complete Documentation
3. **[README.md](README.md)** - Full API reference and options
4. **[GETTING_STARTED.md](GETTING_STARTED.md)** - Complete setup guide

### Migration Guide
5. **[MIGRATION.md](MIGRATION.md)** - Moving from node-html-pdf

### Technical Details
6. **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Architecture overview
7. **[IMPLEMENTATION_COMPLETE.md](IMPLEMENTATION_COMPLETE.md)** - Project completion report

---

## 📖 Documentation by Purpose

### I want to...

#### "Get started quickly"
→ **[QUICKSTART.md](QUICKSTART.md)** (5 min read)
→ **[examples/basic.js](examples/basic.js)** (code example)

#### "Understand all the options"
→ **[README.md](README.md)** - See "Options" section
→ **[examples/header-footer.js](examples/header-footer.js)** (options example)

#### "Migrate from node-html-pdf"
→ **[MIGRATION.md](MIGRATION.md)** - Complete migration guide
→ Check API compatibility table

#### "See real-world examples"
→ **[examples/advanced-invoice.js](examples/advanced-invoice.js)** - Complex invoice
→ **[examples/](examples/)** - All examples

#### "Integrate with my app"
→ **[examples/buffer-stream.js](examples/buffer-stream.js)** - Buffers & streams
→ **[README.md](README.md)** - API reference

#### "Use the CLI tool"
→ **[README.md](README.md)** - See "Command Line Usage"
→ **[bin/html-pdf-chrome.js](bin/html-pdf-chrome.js)** - CLI source

#### "Understand the implementation"
→ **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Technical overview
→ **[lib/index.js](lib/index.js)** - Source code

#### "Contribute to the project"
→ **[IMPLEMENTATION_COMPLETE.md](IMPLEMENTATION_COMPLETE.md)** - Project structure
→ **[test/test.js](test/test.js)** - Test suite

---

## 📋 File Reference

### Documentation Files

| File | Size | Purpose | Audience |
|------|------|---------|----------|
| **README.md** | 7.8K | Main documentation & API reference | All users |
| **QUICKSTART.md** | 3.9K | 5-minute quick start | New users |
| **MIGRATION.md** | 6.0K | Migration from node-html-pdf | Migrating users |
| **GETTING_STARTED.md** | 4.7K | Complete setup guide | Setup/Install |
| **PROJECT_SUMMARY.md** | 7.3K | Technical architecture | Developers |
| **IMPLEMENTATION_COMPLETE.md** | 9.8K | Project completion report | Review |
| **DOC_INDEX.md** | This file | Documentation navigation | Everyone |
| **CHANGELOG.md** | 722B | Version history | Maintainers |
| **LICENSE** | 1.0K | MIT License | Legal |

### Code Files

| File | Size | Purpose |
|------|------|---------|
| **lib/index.js** | 7.7K | Main library implementation |
| **lib/index.d.ts** | 2.1K | TypeScript definitions |
| **bin/html-pdf-chrome.js** | 3.3K | CLI tool |
| **test/test.js** | 4.1K | Test suite |

### Example Files

| File | Size | Description |
|------|------|-------------|
| **examples/basic.js** | 1.0K | Simple PDF generation |
| **examples/buffer-stream.js** | 1.4K | Buffers and streams |
| **examples/from-file.js** | 688B | Load HTML from file |
| **examples/header-footer.js** | 1.5K | Headers and footers |
| **examples/advanced-invoice.js** | 8.3K | Complex invoice example |
| **examples/test.html** | 3.5K | Sample HTML file |

---

## 🎓 Learning Path

### Beginner Path (30 minutes)
1. Read **QUICKSTART.md** (5 min)
2. Run **examples/basic.js** (5 min)
3. Modify basic example (10 min)
4. Try **examples/header-footer.js** (10 min)

### Intermediate Path (1 hour)
1. Read **README.md** fully (15 min)
2. Try all examples (15 min)
3. Read **lib/index.js** to understand implementation (20 min)
4. Create your own custom PDF (10 min)

### Advanced Path (2 hours)
1. Read **PROJECT_SUMMARY.md** (20 min)
2. Study **lib/index.js** in detail (30 min)
3. Review **test/test.js** (20 min)
4. Read **MIGRATION.md** (20 min)
5. Build a complex application (30 min)

### Migration Path (45 minutes)
1. Read **MIGRATION.md** (20 min)
2. Review differences table (10 min)
3. Update your code (10 min)
4. Test with your existing HTML (5 min)

---

## 🔍 Quick Reference

### Common Tasks

#### Generate PDF from HTML string
```javascript
const pdf = require('html-pdf-chrome');
pdf.create(html).toFile('./output.pdf');
```
📖 See: **README.md** - Basic Usage

#### Generate with custom options
```javascript
pdf.create(html, { format: 'A4', border: '10mm' })
  .toFile('./output.pdf');
```
📖 See: **README.md** - Options

#### Use async/await
```javascript
const buffer = await pdf.create(html).toBuffer();
```
📖 See: **examples/buffer-stream.js**

#### Add headers and footers
```javascript
const options = {
  header: { height: '20mm', contents: '<div>Header</div>' },
  footer: { height: '20mm', contents: '<div>Footer</div>' }
};
```
📖 See: **examples/header-footer.js**

#### CLI usage
```bash
html-pdf-chrome input.html output.pdf --format A4
```
📖 See: **README.md** - Command Line Usage

---

## 📞 Getting Help

### Where to look...

#### For installation issues:
→ **GETTING_STARTED.md** - Troubleshooting section
→ Check Puppeteer installation docs

#### For API questions:
→ **README.md** - API section
→ **lib/index.d.ts** - TypeScript definitions

#### For examples:
→ **examples/** directory
→ **QUICKSTART.md** - Common use cases

#### For migration help:
→ **MIGRATION.md** - Full migration guide
→ API compatibility table

#### For technical details:
→ **PROJECT_SUMMARY.md** - Architecture
→ **lib/index.js** - Source code

---

## 🗂️ Documentation Categories

### By Type
- **Getting Started**: QUICKSTART.md, GETTING_STARTED.md
- **Reference**: README.md, lib/index.d.ts
- **Guides**: MIGRATION.md
- **Examples**: examples/*.js
- **Technical**: PROJECT_SUMMARY.md, IMPLEMENTATION_COMPLETE.md
- **Project**: CHANGELOG.md, LICENSE

### By Audience
- **End Users**: README.md, QUICKSTART.md, examples/
- **Developers**: PROJECT_SUMMARY.md, lib/index.js, test/
- **Migrating Users**: MIGRATION.md
- **Contributors**: IMPLEMENTATION_COMPLETE.md, PROJECT_SUMMARY.md

### By Goal
- **Learn**: QUICKSTART.md, examples/
- **Reference**: README.md, lib/index.d.ts
- **Migrate**: MIGRATION.md
- **Understand**: PROJECT_SUMMARY.md, IMPLEMENTATION_COMPLETE.md
- **Contribute**: All technical docs

---

## 📊 Documentation Coverage

✅ Installation guide  
✅ Quick start guide  
✅ Complete API reference  
✅ All options documented  
✅ Migration guide  
✅ Code examples (5)  
✅ CLI documentation  
✅ TypeScript definitions  
✅ Architecture overview  
✅ Test documentation  
✅ Troubleshooting guide  
✅ Performance tips  
✅ Security considerations  

---

## 🎯 Next Steps

Choose your path:

1. **New to the library?**
   → Start with [QUICKSTART.md](QUICKSTART.md)

2. **Migrating from node-html-pdf?**
   → Read [MIGRATION.md](MIGRATION.md)

3. **Need complete reference?**
   → See [README.md](README.md)

4. **Want to understand internals?**
   → Read [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)

---

**Last Updated**: November 28, 2025  
**Version**: 1.0.0  
**Status**: Complete ✅

---

Happy reading! 📚✨
