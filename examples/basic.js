const fs = require('fs');
const pdf = require('../lib/index');

// Example 1: Basic usage - generate PDF from HTML string
const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 40px;
    }
    h1 {
      color: #333;
    }
    .highlight {
      background-color: yellow;
      padding: 10px;
    }
  </style>
</head>
<body>
  <h1>Hello from html-pdf-chrome!</h1>
  <p>This is a modern replacement for node-html-pdf using Puppeteer.</p>
  <div class="highlight">
    <p>This library uses headless Chrome instead of the deprecated PhantomJS.</p>
  </div>
</body>
</html>
`;

const options = {
    format: 'Letter',
    orientation: 'portrait',
    border: '10mm'
};

// Example using toFile
console.log('Generating PDF...');
pdf.create(html, options).toFile('./output.pdf', function (err, res) {
    if (err) {
        console.error('Error:', err);
        return;
    }
    console.log('PDF created successfully!');
    console.log('File saved to:', res.filename);
});
