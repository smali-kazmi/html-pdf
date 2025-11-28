#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const pdf = require('../lib/index');

// Parse command line arguments
const args = process.argv.slice(2);

function showHelp() {
    console.log(`
html-pdf-chrome - HTML to PDF converter using Puppeteer

Usage:
  html-pdf-chrome <input.html> <output.pdf> [options]

Options:
  --format <format>          Page format: A3, A4, A5, Legal, Letter, Tabloid (default: A4)
  --orientation <orient>     Page orientation: portrait, landscape (default: portrait)
  --border <size>           Page border/margin (e.g., 10mm, 1in)
  --width <width>           Page width (e.g., 210mm, 8.5in)
  --height <height>         Page height (e.g., 297mm, 11in)
  --timeout <ms>            Timeout in milliseconds (default: 30000)
  --render-delay <ms>       Delay before rendering in milliseconds
  --no-background           Don't print background graphics
  --help, -h                Show this help message

Examples:
  html-pdf-chrome input.html output.pdf
  html-pdf-chrome input.html output.pdf --format Letter
  html-pdf-chrome input.html output.pdf --format A4 --orientation landscape
  html-pdf-chrome input.html output.pdf --border 20mm
  `);
}

// Check for help flag
if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    showHelp();
    process.exit(0);
}

// Check minimum arguments
if (args.length < 2) {
    console.error('Error: Input and output files are required');
    showHelp();
    process.exit(1);
}

const inputFile = args[0];
const outputFile = args[1];

// Check if input file exists
if (!fs.existsSync(inputFile)) {
    console.error(`Error: Input file '${inputFile}' not found`);
    process.exit(1);
}

// Parse options from command line
const options = {
    format: 'A4',
    orientation: 'portrait',
    printBackground: true,
};

for (let i = 2; i < args.length; i++) {
    const arg = args[i];

    switch (arg) {
        case '--format':
            options.format = args[++i];
            break;
        case '--orientation':
            options.orientation = args[++i];
            break;
        case '--border':
            options.border = args[++i];
            break;
        case '--width':
            options.width = args[++i];
            break;
        case '--height':
            options.height = args[++i];
            break;
        case '--timeout':
            options.timeout = parseInt(args[++i]);
            break;
        case '--render-delay':
            options.renderDelay = parseInt(args[++i]);
            break;
        case '--no-background':
            options.printBackground = false;
            break;
        default:
            if (arg.startsWith('--')) {
                console.error(`Unknown option: ${arg}`);
                process.exit(1);
            }
    }
}

// Read HTML file
console.log(`Reading HTML from: ${inputFile}`);
const html = fs.readFileSync(inputFile, 'utf8');

// Generate PDF
console.log(`Generating PDF...`);
pdf.create(html, options).toFile(outputFile, function (err, res) {
    if (err) {
        console.error('Error generating PDF:', err.message);
        process.exit(1);
    }

    console.log(`✓ PDF generated successfully: ${res.filename}`);

    // Show file size
    const stats = fs.statSync(res.filename);
    const fileSizeKB = (stats.size / 1024).toFixed(2);
    console.log(`  File size: ${fileSizeKB} KB`);
});
