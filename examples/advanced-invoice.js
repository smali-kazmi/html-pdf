const pdf = require('../lib/index');
const fs = require('fs');

// Advanced example: Invoice generation with all features
const invoiceHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Invoice</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Helvetica', Arial, sans-serif;
      font-size: 12px;
      line-height: 1.6;
      color: #333;
    }
    
    .container {
      padding: 20px;
    }
    
    .header {
      display: flex;
      justify-content: space-between;
      align-items: start;
      margin-bottom: 30px;
      padding-bottom: 20px;
      border-bottom: 2px solid #3498db;
    }
    
    .company-info h1 {
      color: #3498db;
      font-size: 24px;
      margin-bottom: 5px;
    }
    
    .company-info p {
      color: #666;
      font-size: 11px;
    }
    
    .invoice-info {
      text-align: right;
    }
    
    .invoice-info h2 {
      color: #2c3e50;
      font-size: 28px;
      margin-bottom: 10px;
    }
    
    .invoice-details {
      font-size: 11px;
    }
    
    .invoice-details p {
      margin: 3px 0;
    }
    
    .billing-section {
      display: flex;
      justify-content: space-between;
      margin-bottom: 30px;
    }
    
    .billing-section > div {
      width: 48%;
    }
    
    .billing-section h3 {
      color: #2c3e50;
      font-size: 14px;
      margin-bottom: 10px;
      padding-bottom: 5px;
      border-bottom: 1px solid #ddd;
    }
    
    .billing-section p {
      margin: 3px 0;
      font-size: 11px;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 30px;
    }
    
    thead {
      background-color: #3498db;
      color: white;
    }
    
    th {
      padding: 12px;
      text-align: left;
      font-weight: 600;
      font-size: 11px;
      text-transform: uppercase;
    }
    
    td {
      padding: 10px 12px;
      border-bottom: 1px solid #eee;
      font-size: 11px;
    }
    
    tbody tr:hover {
      background-color: #f8f9fa;
    }
    
    .text-right {
      text-align: right;
    }
    
    .totals {
      width: 300px;
      margin-left: auto;
      margin-bottom: 30px;
    }
    
    .totals table {
      margin-bottom: 0;
    }
    
    .totals td {
      padding: 8px 12px;
    }
    
    .totals .total-row {
      background-color: #3498db;
      color: white;
      font-weight: bold;
      font-size: 14px;
    }
    
    .notes {
      background-color: #f8f9fa;
      padding: 15px;
      border-left: 3px solid #3498db;
      margin-bottom: 20px;
    }
    
    .notes h4 {
      color: #2c3e50;
      font-size: 12px;
      margin-bottom: 8px;
    }
    
    .notes p {
      font-size: 11px;
      color: #666;
    }
    
    .footer {
      text-align: center;
      padding-top: 20px;
      border-top: 1px solid #ddd;
      color: #666;
      font-size: 10px;
    }
    
    @media print {
      body {
        print-color-adjust: exact;
        -webkit-print-color-adjust: exact;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="company-info">
        <h1>ACME Corporation</h1>
        <p>123 Business Street</p>
        <p>New York, NY 10001</p>
        <p>Phone: (555) 123-4567</p>
        <p>Email: billing@acme.com</p>
      </div>
      <div class="invoice-info">
        <h2>INVOICE</h2>
        <div class="invoice-details">
          <p><strong>Invoice #:</strong> INV-2025-001</p>
          <p><strong>Date:</strong> November 28, 2025</p>
          <p><strong>Due Date:</strong> December 28, 2025</p>
        </div>
      </div>
    </div>
    
    <div class="billing-section">
      <div>
        <h3>Bill To</h3>
        <p><strong>John Smith</strong></p>
        <p>Tech Solutions Inc.</p>
        <p>456 Client Avenue</p>
        <p>San Francisco, CA 94102</p>
        <p>john.smith@techsolutions.com</p>
      </div>
      <div>
        <h3>Ship To</h3>
        <p><strong>Tech Solutions Inc.</strong></p>
        <p>456 Client Avenue</p>
        <p>San Francisco, CA 94102</p>
      </div>
    </div>
    
    <table>
      <thead>
        <tr>
          <th style="width: 50%">Description</th>
          <th class="text-right">Quantity</th>
          <th class="text-right">Unit Price</th>
          <th class="text-right">Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Web Development Services - Phase 1</td>
          <td class="text-right">40 hours</td>
          <td class="text-right">$150.00</td>
          <td class="text-right">$6,000.00</td>
        </tr>
        <tr>
          <td>UI/UX Design Services</td>
          <td class="text-right">20 hours</td>
          <td class="text-right">$125.00</td>
          <td class="text-right">$2,500.00</td>
        </tr>
        <tr>
          <td>Database Setup and Configuration</td>
          <td class="text-right">10 hours</td>
          <td class="text-right">$150.00</td>
          <td class="text-right">$1,500.00</td>
        </tr>
        <tr>
          <td>API Integration Services</td>
          <td class="text-right">15 hours</td>
          <td class="text-right">$175.00</td>
          <td class="text-right">$2,625.00</td>
        </tr>
        <tr>
          <td>Cloud Hosting Setup (3 months)</td>
          <td class="text-right">3 months</td>
          <td class="text-right">$200.00</td>
          <td class="text-right">$600.00</td>
        </tr>
      </tbody>
    </table>
    
    <div class="totals">
      <table>
        <tr>
          <td>Subtotal</td>
          <td class="text-right">$13,225.00</td>
        </tr>
        <tr>
          <td>Tax (8.5%)</td>
          <td class="text-right">$1,124.13</td>
        </tr>
        <tr class="total-row">
          <td>Total Due</td>
          <td class="text-right">$14,349.13</td>
        </tr>
      </table>
    </div>
    
    <div class="notes">
      <h4>Payment Terms</h4>
      <p>Payment is due within 30 days. Please make checks payable to ACME Corporation and mail to the address above. For wire transfers, please contact our accounting department.</p>
    </div>
    
    <div class="notes">
      <h4>Notes</h4>
      <p>Thank you for your business! If you have any questions about this invoice, please contact us at billing@acme.com or call (555) 123-4567.</p>
    </div>
    
    <div class="footer">
      <p>ACME Corporation | Tax ID: 12-3456789 | www.acme.com</p>
      <p>This is a computer-generated invoice and does not require a signature.</p>
    </div>
  </div>
</body>
</html>
`;

// Advanced options with headers, footers, and custom margins
const options = {
    format: 'Letter',
    orientation: 'portrait',
    border: {
        top: '20mm',
        right: '15mm',
        bottom: '25mm',  // Extra space for footer
        left: '15mm'
    },
    header: {
        height: '15mm',
        contents: `
      <div style="text-align: center; font-size: 9px; color: #666; padding: 5px 0; border-bottom: 1px solid #ddd;">
        ACME Corporation - Invoice Document
      </div>
    `
    },
    footer: {
        height: '20mm',
        contents: `
      <div style="text-align: center; font-size: 9px; color: #666; padding: 10px 0; border-top: 1px solid #ddd;">
        <div>Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>
        <div style="margin-top: 5px;">Generated on: November 28, 2025</div>
      </div>
    `
    },
    printBackground: true,
    timeout: 30000,
};

console.log('Generating advanced invoice PDF...');
console.log('Options:', JSON.stringify(options, null, 2));

pdf.create(invoiceHTML, options).toFile('./invoice-advanced.pdf', function (err, res) {
    if (err) {
        console.error('Error generating PDF:', err);
        return;
    }

    console.log('\n✓ Invoice PDF generated successfully!');
    console.log('  File:', res.filename);

    const stats = fs.statSync(res.filename);
    console.log('  Size:', (stats.size / 1024).toFixed(2), 'KB');

    console.log('\nThis example demonstrates:');
    console.log('  • Complex HTML/CSS layout');
    console.log('  • Custom headers and footers');
    console.log('  • Page margins configuration');
    console.log('  • Professional invoice design');
    console.log('  • Background color printing');
    console.log('  • Page numbering');
});
