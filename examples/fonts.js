const pdf = require('../lib/index');
const fs = require('fs');

// Example: Typography showcase with various fonts
const fontsHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Typography & Fonts Showcase</title>
  
  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&family=Open+Sans:wght@400;600;700&family=Lato:wght@300;400;700&family=Montserrat:wght@400;600;700&family=Playfair+Display:wght@400;700&family=Merriweather:wght@400;700&family=Raleway:wght@300;400;600&family=Ubuntu:wght@400;500;700&family=Poppins:wght@300;400;600;700&family=Oswald:wght@400;600&display=swap" rel="stylesheet">
  
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      padding: 40px;
      background: #ffffff;
      color: #2c3e50;
    }
    
    .header {
      text-align: center;
      margin-bottom: 50px;
      padding-bottom: 30px;
      border-bottom: 3px solid #3498db;
    }
    
    .header h1 {
      font-family: 'Montserrat', sans-serif;
      font-size: 42px;
      color: #2c3e50;
      margin-bottom: 10px;
      font-weight: 700;
    }
    
    .header p {
      font-family: 'Open Sans', sans-serif;
      font-size: 16px;
      color: #7f8c8d;
    }
    
    .font-section {
      margin-bottom: 40px;
      padding: 30px;
      background: #f8f9fa;
      border-radius: 8px;
      border-left: 5px solid #3498db;
      page-break-inside: avoid;
    }
    
    .font-name {
      font-size: 14px;
      color: #7f8c8d;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-bottom: 15px;
      font-family: 'Arial', sans-serif;
    }
    
    .font-display {
      margin-bottom: 20px;
    }
    
    .sample-heading {
      font-size: 36px;
      margin-bottom: 10px;
      color: #2c3e50;
    }
    
    .sample-subheading {
      font-size: 24px;
      margin-bottom: 10px;
      color: #34495e;
    }
    
    .sample-text {
      font-size: 16px;
      line-height: 1.8;
      color: #555;
    }
    
    .weights {
      display: flex;
      gap: 20px;
      margin-top: 15px;
      flex-wrap: wrap;
    }
    
    .weight-sample {
      flex: 1;
      min-width: 200px;
      padding: 15px;
      background: white;
      border-radius: 4px;
      border: 1px solid #e0e0e0;
    }
    
    .weight-label {
      font-size: 11px;
      color: #95a5a6;
      text-transform: uppercase;
      margin-bottom: 8px;
      font-family: 'Arial', sans-serif;
    }
    
    /* Font families */
    .roboto { font-family: 'Roboto', sans-serif; }
    .open-sans { font-family: 'Open Sans', sans-serif; }
    .lato { font-family: 'Lato', sans-serif; }
    .montserrat { font-family: 'Montserrat', sans-serif; }
    .playfair { font-family: 'Playfair Display', serif; }
    .merriweather { font-family: 'Merriweather', serif; }
    .raleway { font-family: 'Raleway', sans-serif; }
    .ubuntu { font-family: 'Ubuntu', sans-serif; }
    .poppins { font-family: 'Poppins', sans-serif; }
    .oswald { font-family: 'Oswald', sans-serif; }
    
    /* System fonts */
    .arial { font-family: Arial, sans-serif; }
    .helvetica { font-family: Helvetica, Arial, sans-serif; }
    .times { font-family: 'Times New Roman', Times, serif; }
    .georgia { font-family: Georgia, serif; }
    .courier { font-family: 'Courier New', Courier, monospace; }
    .verdana { font-family: Verdana, sans-serif; }
    .trebuchet { font-family: 'Trebuchet MS', sans-serif; }
    
    /* Font weights */
    .light { font-weight: 300; }
    .regular { font-weight: 400; }
    .medium { font-weight: 500; }
    .semibold { font-weight: 600; }
    .bold { font-weight: 700; }
    
    .comparison-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
      margin: 30px 0;
    }
    
    .comparison-box {
      padding: 20px;
      background: white;
      border-radius: 8px;
      border: 2px solid #e0e0e0;
    }
    
    .section-title {
      font-family: 'Montserrat', sans-serif;
      font-size: 28px;
      color: #2c3e50;
      margin: 40px 0 20px 0;
      padding-bottom: 10px;
      border-bottom: 2px solid #3498db;
      font-weight: 600;
    }
    
    .page-break {
      page-break-after: always;
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
  <div class="header">
    <h1>Typography & Fonts Showcase</h1>
    <p>A comprehensive demonstration of various fonts and typography styles</p>
  </div>

  <!-- Google Fonts -->
  <h2 class="section-title">Google Fonts</h2>

  <div class="font-section">
    <div class="font-name">Roboto (Sans-Serif)</div>
    <div class="font-display roboto">
      <div class="sample-heading">The Quick Brown Fox Jumps</div>
      <div class="sample-subheading">Over the Lazy Dog - 1234567890</div>
      <p class="sample-text">
        Roboto has a mechanical skeleton and the forms are largely geometric. At the same time, the font features friendly and open curves. This modern sans-serif is one of the most popular web fonts.
      </p>
    </div>
    <div class="weights">
      <div class="weight-sample">
        <div class="weight-label">Light (300)</div>
        <div class="roboto light" style="font-size: 18px;">The quick brown fox jumps over the lazy dog</div>
      </div>
      <div class="weight-sample">
        <div class="weight-label">Regular (400)</div>
        <div class="roboto regular" style="font-size: 18px;">The quick brown fox jumps over the lazy dog</div>
      </div>
      <div class="weight-sample">
        <div class="weight-label">Bold (700)</div>
        <div class="roboto bold" style="font-size: 18px;">The quick brown fox jumps over the lazy dog</div>
      </div>
    </div>
  </div>

  <div class="font-section">
    <div class="font-name">Open Sans (Sans-Serif)</div>
    <div class="font-display open-sans">
      <div class="sample-heading">The Quick Brown Fox Jumps</div>
      <div class="sample-subheading">Over the Lazy Dog - 1234567890</div>
      <p class="sample-text">
        Open Sans is a humanist sans-serif typeface designed by Steve Matteson. It features an upright stress, open forms, and a neutral, yet friendly appearance, optimized for print, web, and mobile interfaces.
      </p>
    </div>
    <div class="weights">
      <div class="weight-sample">
        <div class="weight-label">Regular (400)</div>
        <div class="open-sans regular" style="font-size: 18px;">The quick brown fox jumps over the lazy dog</div>
      </div>
      <div class="weight-sample">
        <div class="weight-label">Semibold (600)</div>
        <div class="open-sans semibold" style="font-size: 18px;">The quick brown fox jumps over the lazy dog</div>
      </div>
      <div class="weight-sample">
        <div class="weight-label">Bold (700)</div>
        <div class="open-sans bold" style="font-size: 18px;">The quick brown fox jumps over the lazy dog</div>
      </div>
    </div>
  </div>

  <div class="font-section">
    <div class="font-name">Montserrat (Sans-Serif)</div>
    <div class="font-display montserrat">
      <div class="sample-heading">The Quick Brown Fox Jumps</div>
      <div class="sample-subheading">Over the Lazy Dog - 1234567890</div>
      <p class="sample-text">
        Montserrat is inspired by the old posters and signs in the traditional Montserrat neighborhood of Buenos Aires. It's a geometric sans-serif with a modern, clean look that works well for headers and body text.
      </p>
    </div>
    <div class="weights">
      <div class="weight-sample">
        <div class="weight-label">Regular (400)</div>
        <div class="montserrat regular" style="font-size: 18px;">The quick brown fox jumps over the lazy dog</div>
      </div>
      <div class="weight-sample">
        <div class="weight-label">Semibold (600)</div>
        <div class="montserrat semibold" style="font-size: 18px;">The quick brown fox jumps over the lazy dog</div>
      </div>
      <div class="weight-sample">
        <div class="weight-label">Bold (700)</div>
        <div class="montserrat bold" style="font-size: 18px;">The quick brown fox jumps over the lazy dog</div>
      </div>
    </div>
  </div>

  <div class="font-section">
    <div class="font-name">Poppins (Sans-Serif)</div>
    <div class="font-display poppins">
      <div class="sample-heading">The Quick Brown Fox Jumps</div>
      <div class="sample-subheading">Over the Lazy Dog - 1234567890</div>
      <p class="sample-text">
        Poppins is a geometric sans-serif with Indian scripts. Each letterform is nearly monolinear, with optical corrections applied to stroke joints where necessary to maintain an even typographic color.
      </p>
    </div>
    <div class="weights">
      <div class="weight-sample">
        <div class="weight-label">Light (300)</div>
        <div class="poppins light" style="font-size: 18px;">The quick brown fox jumps over the lazy dog</div>
      </div>
      <div class="weight-sample">
        <div class="weight-label">Regular (400)</div>
        <div class="poppins regular" style="font-size: 18px;">The quick brown fox jumps over the lazy dog</div>
      </div>
      <div class="weight-sample">
        <div class="weight-label">Bold (700)</div>
        <div class="poppins bold" style="font-size: 18px;">The quick brown fox jumps over the lazy dog</div>
      </div>
    </div>
  </div>

  <div class="page-break"></div>

  <div class="font-section">
    <div class="font-name">Playfair Display (Serif)</div>
    <div class="font-display playfair">
      <div class="sample-heading">The Quick Brown Fox Jumps</div>
      <div class="sample-subheading">Over the Lazy Dog - 1234567890</div>
      <p class="sample-text">
        Playfair Display is a transitional design with high contrast between thick and thin strokes. It's perfect for titling and headlines and brings an elegant, sophisticated feel to any design.
      </p>
    </div>
    <div class="weights">
      <div class="weight-sample">
        <div class="weight-label">Regular (400)</div>
        <div class="playfair regular" style="font-size: 18px;">The quick brown fox jumps over the lazy dog</div>
      </div>
      <div class="weight-sample">
        <div class="weight-label">Bold (700)</div>
        <div class="playfair bold" style="font-size: 18px;">The quick brown fox jumps over the lazy dog</div>
      </div>
    </div>
  </div>

  <div class="font-section">
    <div class="font-name">Merriweather (Serif)</div>
    <div class="font-display merriweather">
      <div class="sample-heading">The Quick Brown Fox Jumps</div>
      <div class="sample-subheading">Over the Lazy Dog - 1234567890</div>
      <p class="sample-text">
        Merriweather is designed to be a text face that is pleasant to read on screens. It features a very large x-height, slightly condensed letterforms, and strong serifs. This serif font is excellent for body text.
      </p>
    </div>
    <div class="weights">
      <div class="weight-sample">
        <div class="weight-label">Regular (400)</div>
        <div class="merriweather regular" style="font-size: 18px;">The quick brown fox jumps over the lazy dog</div>
      </div>
      <div class="weight-sample">
        <div class="weight-label">Bold (700)</div>
        <div class="merriweather bold" style="font-size: 18px;">The quick brown fox jumps over the lazy dog</div>
      </div>
    </div>
  </div>

  <!-- System Fonts -->
  <h2 class="section-title">System Fonts</h2>

  <div class="comparison-grid">
    <div class="comparison-box">
      <div class="font-name">Arial</div>
      <div class="arial" style="font-size: 20px; margin-bottom: 10px; font-weight: bold;">The Quick Brown Fox</div>
      <p class="arial" style="font-size: 14px;">Arial is a neo-grotesque sans-serif typeface. It's one of the most widely used fonts in the world.</p>
    </div>
    
    <div class="comparison-box">
      <div class="font-name">Helvetica</div>
      <div class="helvetica" style="font-size: 20px; margin-bottom: 10px; font-weight: bold;">The Quick Brown Fox</div>
      <p class="helvetica" style="font-size: 14px;">Helvetica is a widely used sans-serif typeface known for its clean, modern appearance.</p>
    </div>
    
    <div class="comparison-box">
      <div class="font-name">Times New Roman</div>
      <div class="times" style="font-size: 20px; margin-bottom: 10px; font-weight: bold;">The Quick Brown Fox</div>
      <p class="times" style="font-size: 14px;">Times New Roman is a serif typeface commissioned in 1931. It's a classic choice for formal documents.</p>
    </div>
    
    <div class="comparison-box">
      <div class="font-name">Georgia</div>
      <div class="georgia" style="font-size: 20px; margin-bottom: 10px; font-weight: bold;">The Quick Brown Fox</div>
      <p class="georgia" style="font-size: 14px;">Georgia is a serif typeface designed for clarity at small sizes on computer screens.</p>
    </div>
    
    <div class="comparison-box">
      <div class="font-name">Courier New</div>
      <div class="courier" style="font-size: 20px; margin-bottom: 10px; font-weight: bold;">The Quick Brown Fox</div>
      <p class="courier" style="font-size: 14px;">Courier is a monospaced slab serif typeface. Perfect for code and technical documents.</p>
    </div>
    
    <div class="comparison-box">
      <div class="font-name">Verdana</div>
      <div class="verdana" style="font-size: 20px; margin-bottom: 10px; font-weight: bold;">The Quick Brown Fox</div>
      <p class="verdana" style="font-size: 14px;">Verdana is a humanist sans-serif designed for excellent readability on screens.</p>
    </div>
  </div>

  <!-- Typography Best Practices -->
  <div class="page-break"></div>
  <h2 class="section-title">Typography Best Practices</h2>

  <div class="font-section">
    <div class="font-name">Font Pairing Example 1: Montserrat + Open Sans</div>
    <div style="padding: 20px; background: white; border-radius: 8px;">
      <h1 class="montserrat bold" style="font-size: 32px; margin-bottom: 15px; color: #2c3e50;">
        Elegant Heading with Montserrat
      </h1>
      <p class="open-sans" style="font-size: 16px; line-height: 1.8; color: #555;">
        Body text using Open Sans for optimal readability. This combination creates a modern, professional look that works well for business documents, presentations, and marketing materials. The geometric Montserrat pairs beautifully with the humanist Open Sans.
      </p>
    </div>
  </div>

  <div class="font-section">
    <div class="font-name">Font Pairing Example 2: Playfair Display + Lato</div>
    <div style="padding: 20px; background: white; border-radius: 8px;">
      <h1 class="playfair bold" style="font-size: 32px; margin-bottom: 15px; color: #2c3e50;">
        Sophisticated Heading with Playfair
      </h1>
      <p class="lato" style="font-size: 16px; line-height: 1.8; color: #555;">
        Body text using Lato creates a classic yet contemporary feel. This pairing is perfect for editorial content, luxury brands, and creative portfolios. The high contrast serif headline with clean sans-serif body creates visual hierarchy.
      </p>
    </div>
  </div>

  <div class="font-section">
    <div class="font-name">Font Pairing Example 3: Oswald + Merriweather</div>
    <div style="padding: 20px; background: white; border-radius: 8px;">
      <h1 class="oswald semibold" style="font-size: 32px; margin-bottom: 15px; color: #2c3e50; letter-spacing: 1px;">
        BOLD HEADING WITH OSWALD
      </h1>
      <p class="merriweather" style="font-size: 16px; line-height: 1.8; color: #555;">
        Body text using Merriweather provides excellent readability. This combination works great for news articles, blogs, and content-heavy documents. The condensed headline font with the reader-friendly serif body creates perfect balance.
      </p>
    </div>
  </div>

  <!-- Size and Weight Variations -->
  <h2 class="section-title">Font Size & Weight Hierarchy</h2>

  <div class="font-section">
    <div class="poppins bold" style="font-size: 48px; margin-bottom: 10px;">Heading 1 - 48px Bold</div>
    <div class="poppins semibold" style="font-size: 36px; margin-bottom: 10px;">Heading 2 - 36px Semibold</div>
    <div class="poppins semibold" style="font-size: 28px; margin-bottom: 10px;">Heading 3 - 28px Semibold</div>
    <div class="poppins medium" style="font-size: 22px; margin-bottom: 10px;">Heading 4 - 22px Medium</div>
    <div class="poppins regular" style="font-size: 18px; margin-bottom: 10px;">Heading 5 - 18px Regular</div>
    <div class="poppins regular" style="font-size: 16px; margin-bottom: 10px; line-height: 1.8;">Body Text - 16px Regular with increased line height for better readability. This is the standard size for paragraphs and main content.</div>
    <div class="poppins regular" style="font-size: 14px; color: #7f8c8d;">Small Text - 14px Regular for captions and secondary information</div>
  </div>

  <div style="margin-top: 60px; padding: 30px; background: #ecf0f1; border-radius: 8px; text-align: center;">
    <p style="font-family: 'Montserrat', sans-serif; font-size: 12px; color: #7f8c8d;">
      <strong>Note:</strong> Google Fonts require internet connectivity during PDF generation. For offline use, consider using system fonts or embedding custom fonts as base64.
    </p>
  </div>
</body>
</html>
`;

const options = {
    format: 'Letter',
    orientation: 'portrait',
    border: '0',
    printBackground: true,
    timeout: 60000,
    renderDelay: 2000, // Wait for fonts to load
};

console.log('🎨 Generating typography showcase PDF with various fonts...\n');
console.log('Features included:');
console.log('  ✓ 10+ Google Fonts (Roboto, Open Sans, Montserrat, etc.)');
console.log('  ✓ System fonts (Arial, Helvetica, Times, Georgia, etc.)');
console.log('  ✓ Font weight variations (Light, Regular, Bold, etc.)');
console.log('  ✓ Font pairing examples');
console.log('  ✓ Typography hierarchy demonstration');
console.log('  ✓ Serif and sans-serif comparisons\n');

pdf.create(fontsHTML, options).toFile('./examples/output/fonts-example.pdf', function (err, res) {
    if (err) {
        console.error('❌ Error generating PDF:', err);
        return;
    }

    console.log('✓ Typography showcase PDF generated successfully!');
    console.log('  File:', res.filename);

    const stats = fs.statSync(res.filename);
    console.log('  Size:', (stats.size / 1024).toFixed(2), 'KB');

    console.log('\n📝 Font families demonstrated:');
    console.log('  Google Fonts:');
    console.log('    • Roboto (geometric sans-serif)');
    console.log('    • Open Sans (humanist sans-serif)');
    console.log('    • Montserrat (geometric sans-serif)');
    console.log('    • Poppins (geometric sans-serif)');
    console.log('    • Playfair Display (transitional serif)');
    console.log('    • Merriweather (serif for screens)');
    console.log('    • Raleway, Ubuntu, Lato, Oswald');
    console.log('  System Fonts:');
    console.log('    • Arial, Helvetica, Times New Roman');
    console.log('    • Georgia, Courier New, Verdana');
});
