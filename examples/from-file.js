const pdf = require('../lib/index');
const fs = require('fs');

// Example: Load HTML from file
const htmlContent = fs.readFileSync('./test.html', 'utf8');

const options = {
    format: 'A4',
    orientation: 'portrait',
    border: '15mm',
    printBackground: true,
};

console.log('Converting HTML file to PDF...');

pdf.create(htmlContent, options).toFile('./test-output.pdf', function (err, res) {
    if (err) {
        console.error('Error:', err);
        return;
    }

    console.log('✓ PDF created successfully!');
    console.log('  File:', res.filename);

    const stats = fs.statSync(res.filename);
    console.log('  Size:', (stats.size / 1024).toFixed(2), 'KB');
});
