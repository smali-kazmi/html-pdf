const fs = require('fs');
const path = require('path');
const pdf = require('../lib/index');

console.log('🧪 Running html-pdf-chrome tests...\n');

let testsPassed = 0;
let testsFailed = 0;

function testPassed(name) {
    console.log(`✓ ${name}`);
    testsPassed++;
}

function testFailed(name, error) {
    console.log(`✗ ${name}`);
    console.error(`  Error: ${error.message}`);
    testsFailed++;
}

// Test 1: Basic PDF generation to buffer
async function test1() {
    const html = '<h1>Test PDF</h1><p>This is a test.</p>';
    try {
        const buffer = await pdf.create(html).toBuffer();
        if (Buffer.isBuffer(buffer) && buffer.length > 0) {
            testPassed('Test 1: Generate PDF to buffer');
        } else {
            throw new Error('Invalid buffer generated');
        }
    } catch (error) {
        testFailed('Test 1: Generate PDF to buffer', error);
    }
}

// Test 2: PDF generation to file
async function test2() {
    const html = '<h1>Test PDF</h1><p>File test.</p>';
    const filepath = path.join(__dirname, 'test-output.pdf');

    try {
        const result = await pdf.create(html).toFile(filepath);
        if (fs.existsSync(filepath) && result.filename === filepath) {
            fs.unlinkSync(filepath); // Clean up
            testPassed('Test 2: Generate PDF to file');
        } else {
            throw new Error('File not created');
        }
    } catch (error) {
        testFailed('Test 2: Generate PDF to file', error);
    }
}

// Test 3: PDF with options
async function test3() {
    const html = '<h1>Test PDF with Options</h1>';
    const options = {
        format: 'Letter',
        orientation: 'landscape',
        border: '10mm'
    };

    try {
        const buffer = await pdf.create(html, options).toBuffer();
        if (Buffer.isBuffer(buffer) && buffer.length > 0) {
            testPassed('Test 3: Generate PDF with custom options');
        } else {
            throw new Error('Invalid buffer generated');
        }
    } catch (error) {
        testFailed('Test 3: Generate PDF with custom options', error);
    }
}

// Test 4: PDF to stream
async function test4() {
    const html = '<h1>Stream Test</h1>';

    try {
        const stream = await pdf.create(html).toStream();
        if (stream && typeof stream.pipe === 'function') {
            testPassed('Test 4: Generate PDF to stream');
        } else {
            throw new Error('Invalid stream generated');
        }
    } catch (error) {
        testFailed('Test 4: Generate PDF to stream', error);
    }
}

// Test 5: Callback style API
function test5() {
    return new Promise((resolve) => {
        const html = '<h1>Callback Test</h1>';

        pdf.create(html).toBuffer(function (err, buffer) {
            if (err) {
                testFailed('Test 5: Callback style API', err);
            } else if (Buffer.isBuffer(buffer)) {
                testPassed('Test 5: Callback style API');
            } else {
                testFailed('Test 5: Callback style API', new Error('Invalid buffer'));
            }
            resolve();
        });
    });
}

// Test 6: Legacy API (backward compatibility)
function test6() {
    return new Promise((resolve) => {
        const html = '<h1>Legacy API Test</h1>';

        pdf.create(html, { format: 'A4' }, function (err, buffer) {
            if (err) {
                testFailed('Test 6: Legacy API compatibility', err);
            } else if (Buffer.isBuffer(buffer)) {
                testPassed('Test 6: Legacy API compatibility');
            } else {
                testFailed('Test 6: Legacy API compatibility', new Error('Invalid buffer'));
            }
            resolve();
        });
    });
}

// Run all tests
async function runTests() {
    await test1();
    await test2();
    await test3();
    await test4();
    await test5();
    await test6();

    console.log('\n' + '='.repeat(50));
    console.log(`Tests completed: ${testsPassed} passed, ${testsFailed} failed`);
    console.log('='.repeat(50));

    process.exit(testsFailed > 0 ? 1 : 0);
}

runTests().catch(error => {
    console.error('Fatal error running tests:', error);
    process.exit(1);
});
