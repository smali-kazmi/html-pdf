const pdf = require('../lib/index');
const fs = require('fs');

// Complex example: Annual Report with images, tables, charts, and styled header/footer
const complexReportHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Annual Business Report 2025</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      font-size: 11px;
      line-height: 1.6;
      color: #2c3e50;
      background: white;
    }
    
    .container {
      padding: 15px 20px;
    }
    
    /* Cover Page Styling */
    .cover-page {
      height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      text-align: center;
      page-break-after: always;
    }
    
    .cover-logo {
      width: 120px;
      height: 120px;
      background: white;
      border-radius: 50%;
      margin-bottom: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 48px;
      font-weight: bold;
      color: #667eea;
    }
    
    .cover-page h1 {
      font-size: 48px;
      margin-bottom: 15px;
      font-weight: 300;
      letter-spacing: 2px;
    }
    
    .cover-page h2 {
      font-size: 24px;
      font-weight: 300;
      margin-bottom: 40px;
      opacity: 0.9;
    }
    
    .cover-page .meta {
      font-size: 14px;
      opacity: 0.8;
    }
    
    /* Section Headers */
    .section {
      margin: 30px 0;
      page-break-inside: avoid;
    }
    
    .section-header {
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 12px 20px;
      margin: 20px -20px 20px -20px;
      font-size: 18px;
      font-weight: 600;
      border-left: 5px solid #764ba2;
    }
    
    h3 {
      color: #667eea;
      font-size: 16px;
      margin: 20px 0 10px 0;
      font-weight: 600;
    }
    
    /* Image Styling */
    .image-container {
      margin: 20px 0;
      text-align: center;
      page-break-inside: avoid;
    }
    
    .image-container img {
      max-width: 100%;
      height: auto;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    .image-caption {
      margin-top: 8px;
      font-size: 10px;
      color: #7f8c8d;
      font-style: italic;
    }
    
    .image-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 15px;
      margin: 20px 0;
    }
    
    .image-grid img {
      width: 100%;
      height: 150px;
      object-fit: cover;
      border-radius: 8px;
      border: 1px solid #e0e0e0;
    }
    
    /* Table Styling */
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
      font-size: 10px;
      page-break-inside: avoid;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    }
    
    thead {
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
      color: white;
    }
    
    th {
      padding: 10px;
      text-align: left;
      font-weight: 600;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    td {
      padding: 10px;
      border-bottom: 1px solid #ecf0f1;
    }
    
    tbody tr:nth-child(even) {
      background-color: #f8f9fa;
    }
    
    tbody tr:hover {
      background-color: #e8f4f8;
    }
    
    .highlight-row {
      background-color: #fff9e6 !important;
      font-weight: 600;
    }
    
    /* Stats Cards */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 15px;
      margin: 20px 0;
    }
    
    .stat-card {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 20px;
      border-radius: 10px;
      text-align: center;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    
    .stat-number {
      font-size: 28px;
      font-weight: bold;
      margin: 10px 0;
    }
    
    .stat-label {
      font-size: 11px;
      opacity: 0.9;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    /* Info Boxes */
    .info-box {
      background: #e8f4f8;
      border-left: 4px solid #3498db;
      padding: 15px;
      margin: 20px 0;
      border-radius: 4px;
      page-break-inside: avoid;
    }
    
    .warning-box {
      background: #fff9e6;
      border-left: 4px solid #f39c12;
      padding: 15px;
      margin: 20px 0;
      border-radius: 4px;
      page-break-inside: avoid;
    }
    
    .success-box {
      background: #e8f8f5;
      border-left: 4px solid #27ae60;
      padding: 15px;
      margin: 20px 0;
      border-radius: 4px;
      page-break-inside: avoid;
    }
    
    /* Chart Placeholder */
    .chart-container {
      background: #f8f9fa;
      border: 1px solid #dee2e6;
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
      text-align: center;
      page-break-inside: avoid;
    }
    
    .chart-placeholder {
      width: 100%;
      height: 250px;
      background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 18px;
      font-weight: 600;
    }
    
    /* Progress Bars */
    .progress-container {
      margin: 15px 0;
    }
    
    .progress-label {
      display: flex;
      justify-content: space-between;
      margin-bottom: 5px;
      font-size: 10px;
      font-weight: 600;
    }
    
    .progress-bar {
      background: #ecf0f1;
      height: 20px;
      border-radius: 10px;
      overflow: hidden;
    }
    
    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 10px;
      color: white;
      font-size: 10px;
      font-weight: bold;
    }
    
    /* Lists */
    ul, ol {
      margin: 15px 0 15px 25px;
    }
    
    li {
      margin: 8px 0;
      line-height: 1.6;
    }
    
    /* Badges */
    .badge {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 12px;
      font-size: 9px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .badge-success {
      background: #27ae60;
      color: white;
    }
    
    .badge-warning {
      background: #f39c12;
      color: white;
    }
    
    .badge-danger {
      background: #e74c3c;
      color: white;
    }
    
    .badge-info {
      background: #3498db;
      color: white;
    }
    
    /* Page Break Control */
    .page-break {
      page-break-after: always;
    }
    
    .no-break {
      page-break-inside: avoid;
    }
    
    /* Footer Styling */
    .signature-section {
      margin-top: 60px;
      display: flex;
      justify-content: space-between;
    }
    
    .signature {
      text-align: center;
      width: 200px;
    }
    
    .signature-line {
      border-top: 2px solid #2c3e50;
      margin: 40px 0 10px 0;
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
  <!-- Cover Page -->
  <div class="cover-page">
    <div class="cover-logo">AB</div>
    <h1>ANNUAL BUSINESS REPORT</h1>
    <h2>Financial Year 2025</h2>
    <div class="meta">
      <p>Presented by: ACME Business Corporation</p>
      <p>Date: November 29, 2025</p>
    </div>
  </div>

  <!-- Main Content -->
  <div class="container">
    <!-- Executive Summary -->
    <div class="section-header">Executive Summary</div>
    
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-label">Revenue</div>
        <div class="stat-number">$24.5M</div>
        <div class="stat-label">↑ 23% YoY</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Net Profit</div>
        <div class="stat-number">$5.2M</div>
        <div class="stat-label">↑ 18% YoY</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Customers</div>
        <div class="stat-number">12,450</div>
        <div class="stat-label">↑ 35% YoY</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Employees</div>
        <div class="stat-number">284</div>
        <div class="stat-label">↑ 12% YoY</div>
      </div>
    </div>

    <div class="success-box">
      <strong>Achievement Highlight:</strong> We exceeded all quarterly targets and achieved record-breaking revenue growth, positioning us as a market leader in our segment.
    </div>

    <!-- Company Overview with Image -->
    <div class="section-header">Company Overview</div>
    
    <p>ACME Business Corporation has been at the forefront of innovation and excellence since its inception. Our commitment to quality, customer satisfaction, and sustainable growth has propelled us to new heights in 2025.</p>
    
    <div class="image-container">
      <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZDEiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdHlsZT0ic3RvcC1jb2xvcjojNjY3ZWVhO3N0b3Atb3BhY2l0eToxIiAvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM3NjRiYTI7c3RvcC1vcGFjaXR5OjEiIC8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iNjAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0idXJsKCNncmFkMSkiLz4KICA8dGV4dCB4PSIzMDAiIHk9IjE1MCIgZm9udC1zaXplPSI0MCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJBcmlhbCI+Q29tcGFueSBIZWFkcXVhcnRlcnM8L3RleHQ+Cjwvc3ZnPg==" alt="Company Headquarters">
      <div class="image-caption">Figure 1: ACME Corporation Global Headquarters - San Francisco, CA</div>
    </div>

    <h3>Our Mission</h3>
    <p>To deliver innovative solutions that empower businesses worldwide to achieve their full potential through cutting-edge technology and exceptional service.</p>

    <!-- Financial Performance -->
    <div class="section-header">Financial Performance</div>
    
    <h3>Revenue Breakdown by Quarter</h3>
    <table>
      <thead>
        <tr>
          <th>Quarter</th>
          <th>Revenue</th>
          <th>Expenses</th>
          <th>Net Profit</th>
          <th>Margin</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Q1 2025</td>
          <td>$5,800,000</td>
          <td>$4,640,000</td>
          <td>$1,160,000</td>
          <td>20.0%</td>
          <td><span class="badge badge-success">On Target</span></td>
        </tr>
        <tr>
          <td>Q2 2025</td>
          <td>$6,200,000</td>
          <td>$4,960,000</td>
          <td>$1,240,000</td>
          <td>20.0%</td>
          <td><span class="badge badge-success">On Target</span></td>
        </tr>
        <tr>
          <td>Q3 2025</td>
          <td>$6,100,000</td>
          <td>$5,002,000</td>
          <td>$1,098,000</td>
          <td>18.0%</td>
          <td><span class="badge badge-warning">Below Target</span></td>
        </tr>
        <tr>
          <td>Q4 2025</td>
          <td>$6,400,000</td>
          <td>$4,800,000</td>
          <td>$1,600,000</td>
          <td>25.0%</td>
          <td><span class="badge badge-success">Exceeded</span></td>
        </tr>
        <tr class="highlight-row">
          <td><strong>Total 2025</strong></td>
          <td><strong>$24,500,000</strong></td>
          <td><strong>$19,402,000</strong></td>
          <td><strong>$5,098,000</strong></td>
          <td><strong>20.8%</strong></td>
          <td><span class="badge badge-success">Excellent</span></td>
        </tr>
      </tbody>
    </table>

    <div class="info-box">
      <strong>Note:</strong> Q4 performance exceeded expectations due to successful product launches and strong holiday season sales.
    </div>

    <!-- Performance Charts -->
    <h3>Growth Metrics</h3>
    
    <div class="progress-container">
      <div class="progress-label">
        <span>Revenue Growth Target</span>
        <span>123% Complete</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" style="width: 100%;">100%</div>
      </div>
    </div>

    <div class="progress-container">
      <div class="progress-label">
        <span>Customer Acquisition Target</span>
        <span>135% Complete</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" style="width: 100%;">135%</div>
      </div>
    </div>

    <div class="progress-container">
      <div class="progress-label">
        <span>Market Share Growth</span>
        <span>88% Complete</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" style="width: 88%;">88%</div>
      </div>
    </div>

    <div class="progress-container">
      <div class="progress-label">
        <span>Employee Satisfaction</span>
        <span>92% Complete</span>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" style="width: 92%;">92%</div>
      </div>
    </div>

    <!-- Product Portfolio -->
    <div class="page-break"></div>
    <div class="section-header">Product Portfolio</div>

    <div class="image-grid">
      <div>
        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzY2N2VlYSIvPgogIDx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LXNpemU9IjI0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UHJvZHVjdCBBPC90ZXh0Pgo8L3N2Zz4=" alt="Product A">
        <p style="text-align: center; margin-top: 5px; font-size: 10px;"><strong>Product A</strong> - Enterprise Solution</p>
      </div>
      <div>
        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzc2NGJhMiIvPgogIDx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LXNpemU9IjI0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UHJvZHVjdCBCPC90ZXh0Pgo8L3N2Zz4=" alt="Product B">
        <p style="text-align: center; margin-top: 5px; font-size: 10px;"><strong>Product B</strong> - SMB Platform</p>
      </div>
      <div>
        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzM0OThkYiIvPgogIDx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LXNpemU9IjI0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UHJvZHVjdCBDPC90ZXh0Pgo8L3N2Zz4=" alt="Product C">
        <p style="text-align: center; margin-top: 5px; font-size: 10px;"><strong>Product C</strong> - Mobile App</p>
      </div>
      <div>
        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzI3YWU2MCIvPgogIDx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LXNpemU9IjI0IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UHJvZHVjdCBEPC90ZXh0Pgo8L3N2Zz4=" alt="Product D">
        <p style="text-align: center; margin-top: 5px; font-size: 10px;"><strong>Product D</strong> - Analytics Suite</p>
      </div>
    </div>

    <h3>Product Performance Comparison</h3>
    <table>
      <thead>
        <tr>
          <th>Product</th>
          <th>Launch Date</th>
          <th>Units Sold</th>
          <th>Revenue</th>
          <th>Market Share</th>
          <th>Rating</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Product A - Enterprise</td>
          <td>Jan 2023</td>
          <td>1,240</td>
          <td>$12,400,000</td>
          <td>18.5%</td>
          <td>⭐⭐⭐⭐⭐ 4.8/5.0</td>
        </tr>
        <tr>
          <td>Product B - SMB Platform</td>
          <td>Jun 2023</td>
          <td>3,850</td>
          <td>$7,700,000</td>
          <td>24.2%</td>
          <td>⭐⭐⭐⭐⭐ 4.6/5.0</td>
        </tr>
        <tr>
          <td>Product C - Mobile App</td>
          <td>Mar 2024</td>
          <td>8,920</td>
          <td>$2,676,000</td>
          <td>31.8%</td>
          <td>⭐⭐⭐⭐ 4.4/5.0</td>
        </tr>
        <tr>
          <td>Product D - Analytics</td>
          <td>Sep 2024</td>
          <td>2,110</td>
          <td>$1,688,000</td>
          <td>15.3%</td>
          <td>⭐⭐⭐⭐⭐ 4.9/5.0</td>
        </tr>
      </tbody>
    </table>

    <!-- Market Analysis -->
    <div class="section-header">Market Analysis</div>
    
    <h3>Industry Trends & Opportunities</h3>
    <ul>
      <li><strong>Digital Transformation:</strong> Increased demand for cloud-based solutions driving 45% of our revenue growth</li>
      <li><strong>AI Integration:</strong> Machine learning capabilities becoming standard requirement across all product lines</li>
      <li><strong>Cybersecurity:</strong> Growing emphasis on data protection and compliance creating new revenue streams</li>
      <li><strong>Remote Work:</strong> Collaboration tools market expanded by 67% since 2023</li>
      <li><strong>Sustainability:</strong> ESG initiatives influencing 34% of enterprise purchasing decisions</li>
    </ul>

    <div class="warning-box">
      <strong>Risk Assessment:</strong> Increased competition from emerging startups and established tech giants requires continued innovation and strategic positioning.
    </div>

    <h3>Competitive Positioning</h3>
    <table>
      <thead>
        <tr>
          <th>Company</th>
          <th>Market Share</th>
          <th>Revenue (Est.)</th>
          <th>Growth Rate</th>
          <th>Key Strength</th>
        </tr>
      </thead>
      <tbody>
        <tr class="highlight-row">
          <td><strong>ACME Corp (Us)</strong></td>
          <td><strong>22.4%</strong></td>
          <td><strong>$24.5M</strong></td>
          <td><strong>+23%</strong></td>
          <td><strong>Innovation & Support</strong></td>
        </tr>
        <tr>
          <td>Competitor A</td>
          <td>28.1%</td>
          <td>$31.2M</td>
          <td>+15%</td>
          <td>Brand Recognition</td>
        </tr>
        <tr>
          <td>Competitor B</td>
          <td>19.8%</td>
          <td>$22.0M</td>
          <td>+18%</td>
          <td>Price Point</td>
        </tr>
        <tr>
          <td>Competitor C</td>
          <td>16.2%</td>
          <td>$18.0M</td>
          <td>+12%</td>
          <td>Enterprise Focus</td>
        </tr>
        <tr>
          <td>Others</td>
          <td>13.5%</td>
          <td>$15.0M</td>
          <td>+8%</td>
          <td>Niche Markets</td>
        </tr>
      </tbody>
    </table>

    <!-- Future Outlook -->
    <div class="page-break"></div>
    <div class="section-header">2026 Strategic Initiatives</div>

    <h3>Key Objectives</h3>
    <ol>
      <li><strong>Revenue Target:</strong> Achieve $32M in total revenue (31% growth)</li>
      <li><strong>Market Expansion:</strong> Enter 3 new geographic markets in APAC region</li>
      <li><strong>Product Development:</strong> Launch 2 new AI-powered products by Q3 2026</li>
      <li><strong>Talent Acquisition:</strong> Grow team to 350 employees, focus on engineering and sales</li>
      <li><strong>Customer Success:</strong> Improve NPS score from 72 to 80+</li>
      <li><strong>Sustainability:</strong> Achieve carbon neutrality across all operations</li>
    </ol>

    <h3>Investment Allocation</h3>
    <table>
      <thead>
        <tr>
          <th>Category</th>
          <th>2025 Budget</th>
          <th>2026 Planned</th>
          <th>Change</th>
          <th>Priority</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Research & Development</td>
          <td>$3,200,000</td>
          <td>$4,800,000</td>
          <td>+50%</td>
          <td><span class="badge badge-danger">Critical</span></td>
        </tr>
        <tr>
          <td>Sales & Marketing</td>
          <td>$4,100,000</td>
          <td>$5,700,000</td>
          <td>+39%</td>
          <td><span class="badge badge-danger">Critical</span></td>
        </tr>
        <tr>
          <td>Customer Support</td>
          <td>$1,800,000</td>
          <td>$2,400,000</td>
          <td>+33%</td>
          <td><span class="badge badge-warning">High</span></td>
        </tr>
        <tr>
          <td>Infrastructure</td>
          <td>$2,400,000</td>
          <td>$3,100,000</td>
          <td>+29%</td>
          <td><span class="badge badge-warning">High</span></td>
        </tr>
        <tr>
          <td>Operations</td>
          <td>$2,100,000</td>
          <td>$2,500,000</td>
          <td>+19%</td>
          <td><span class="badge badge-info">Medium</span></td>
        </tr>
      </tbody>
    </table>

    <div class="success-box">
      <strong>Board Approval:</strong> All strategic initiatives and budget allocations have been approved by the Board of Directors on November 15, 2025.
    </div>

    <!-- Conclusion -->
    <div class="section-header">Conclusion</div>
    
    <p>The 2025 fiscal year represents a landmark achievement for ACME Business Corporation. Our exceptional growth across all key metrics—revenue, profitability, customer base, and market share—demonstrates the strength of our business model and the dedication of our team.</p>
    
    <p>As we look toward 2026, we are well-positioned to capitalize on emerging opportunities in the market. Our strategic investments in R&D, talent, and market expansion will enable us to maintain our competitive edge and deliver even greater value to our stakeholders.</p>

    <div class="info-box">
      <strong>Shareholder Note:</strong> The Board of Directors has recommended a dividend of $0.85 per share, representing a 21% increase from the previous year, to be paid on January 15, 2026.
    </div>

    <!-- Signatures -->
    <div class="signature-section no-break">
      <div class="signature">
        <div class="signature-line"></div>
        <p><strong>John Anderson</strong></p>
        <p>Chief Executive Officer</p>
      </div>
      <div class="signature">
        <div class="signature-line"></div>
        <p><strong>Sarah Mitchell</strong></p>
        <p>Chief Financial Officer</p>
      </div>
      <div class="signature">
        <div class="signature-line"></div>
        <p><strong>David Chen</strong></p>
        <p>Board Chairman</p>
      </div>
    </div>
  </div>
</body>
</html>
`;

// Advanced options with images in header and footer
const options = {
    format: 'Letter',
    orientation: 'portrait',
    border: {
        top: '25mm',
        right: '15mm',
        bottom: '28mm',
        left: '15mm'
    },
    header: {
        height: '22mm',
        contents: `
      <div style="width: 100%; margin: 0; padding: 0;">
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 8px 20px; border-bottom: 2px solid #667eea; background: linear-gradient(90deg, #f8f9fa 0%, #ffffff 100%);">
          <div style="display: flex; align-items: center;">
            <div style="width: 35px; height: 35px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 16px; margin-right: 10px;">AB</div>
            <div>
              <div style="font-size: 12px; font-weight: bold; color: #2c3e50;">ACME Business Corporation</div>
              <div style="font-size: 9px; color: #7f8c8d;">Annual Report 2025</div>
            </div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 8px; color: #7f8c8d;">CONFIDENTIAL</div>
            <div style="font-size: 9px; color: #2c3e50; font-weight: 600;">Financial Year 2025</div>
          </div>
        </div>
      </div>
    `
    },
    footer: {
        height: '25mm',
        contents: `
      <div style="width: 100%; margin: 0; padding: 0;">
        <div style="padding: 10px 20px; border-top: 2px solid #667eea; background: linear-gradient(90deg, #f8f9fa 0%, #ffffff 100%);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
            <div style="display: flex; align-items: center;">
              <div style="width: 25px; height: 25px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 4px; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 11px; margin-right: 8px;">AC</div>
              <div style="font-size: 8px; color: #2c3e50; line-height: 1.3;">
                <div style="font-weight: 600;">ACME Business Corporation</div>
                <div>123 Business Street, San Francisco, CA 94102</div>
              </div>
            </div>
            <div style="text-align: right; font-size: 8px; color: #2c3e50;">
              <div>Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>
              <div style="margin-top: 2px; color: #7f8c8d;">Generated: November 29, 2025</div>
            </div>
          </div>
          <div style="font-size: 7px; color: #95a5a6; text-align: center; padding-top: 5px; border-top: 1px solid #ecf0f1;">
            © 2025 ACME Business Corporation. All rights reserved. | Tel: (555) 123-4567 | Email: info@acmecorp.com | www.acmecorp.com
          </div>
        </div>
      </div>
    `
    },
    printBackground: true,
    timeout: 60000,
    renderDelay: 500,
};

console.log('🎨 Generating complex annual report PDF with images, tables, and styled headers/footers...\n');
console.log('Features included:');
console.log('  ✓ Cover page with gradient background');
console.log('  ✓ Multiple tables with data');
console.log('  ✓ Embedded SVG images (data URLs)');
console.log('  ✓ Image grid layout');
console.log('  ✓ Progress bars and stat cards');
console.log('  ✓ Custom header with logo and company info');
console.log('  ✓ Custom footer with logo, contact info, and page numbers');
console.log('  ✓ Info boxes, badges, and styled sections');
console.log('  ✓ Professional formatting and page breaks\n');

pdf.create(complexReportHTML, options).toFile('./annual-report-complex.pdf', function (err, res) {
    if (err) {
        console.error('❌ Error generating PDF:', err);
        return;
    }

    console.log('✓ Complex annual report PDF generated successfully!');
    console.log('  File:', res.filename);

    const stats = fs.statSync(res.filename);
    console.log('  Size:', (stats.size / 1024).toFixed(2), 'KB');

    console.log('\n📊 Report includes:');
    console.log('  • Executive summary with key metrics');
    console.log('  • Financial performance tables');
    console.log('  • Product portfolio with images');
    console.log('  • Market analysis and competitive positioning');
    console.log('  • Strategic initiatives for next year');
    console.log('  • Multiple page layouts and styles');
    console.log('  • Professional headers and footers with branding');
});
