const fs = require('fs');
const pdf = require('../lib/index');

// Example: Generate PDF with headers and footers
const html = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: 'Times New Roman', serif;
      margin: 40px;
      line-height: 1.6;
    }
    h1 {
      color: #2c3e50;
      border-bottom: 3px solid #3498db;
      padding-bottom: 10px;
    }
    .content {
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <h1>Professional Document</h1>
  <div class="content">
    <p>This document demonstrates headers and footers.</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
  </div>
</body>
</html>
`;

const options = {
    format: 'A4',
    orientation: 'portrait',
    border: {
        top: '20mm',
        right: '15mm',
        bottom: '20mm',
        left: '15mm'
    },
    header: {
        height: '15mm',
        contents: '<div style="text-align: center; font-size: 10px; color: #666;">Company Name - Confidential</div>'
    },
    footer: {
        height: '15mm',
        contents: '<div style="text-align: center; font-size: 10px; color: #666;"><span class="pageNumber"></span> / <span class="totalPages"></span></div>'
    }
};

pdf.create(html, options).toFile('./output-header-footer.pdf', function (err, res) {
    if (err) {
        console.error('Error:', err);
        return;
    }
    console.log('PDF with headers/footers created:', res.filename);
});
