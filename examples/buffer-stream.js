const pdf = require('../lib/index');

// Example: Generate PDF to buffer and stream
const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial; padding: 20px; }
    h1 { color: #e74c3c; }
  </style>
</head>
<body>
  <h1>Buffer and Stream Example</h1>
  <p>This demonstrates generating PDFs as buffers and streams.</p>
</body>
</html>
`;

// Example 1: Generate to buffer
console.log('Generating PDF to buffer...');
pdf.create(html).toBuffer(function (err, buffer) {
    if (err) {
        console.error('Error:', err);
        return;
    }
    console.log('Buffer generated, size:', buffer.length, 'bytes');
    console.log('Is Buffer:', Buffer.isBuffer(buffer));
});

// Example 2: Generate to stream
console.log('\nGenerating PDF to stream...');
pdf.create(html).toStream(function (err, stream) {
    if (err) {
        console.error('Error:', err);
        return;
    }
    console.log('Stream generated!');

    const fs = require('fs');
    const output = fs.createWriteStream('./output-stream.pdf');
    stream.pipe(output);

    output.on('finish', function () {
        console.log('PDF saved via stream to: ./output-stream.pdf');
    });
});

// Example 3: Async/await usage
async function generatePDF() {
    try {
        const buffer = await pdf.create(html).toBuffer();
        console.log('\nAsync/await: Buffer generated, size:', buffer.length, 'bytes');
    } catch (err) {
        console.error('Error:', err);
    }
}

generatePDF();
