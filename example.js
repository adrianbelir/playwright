const { chromium } = require('playwright'); // Import Playwright

(async () => {
    // Launch a browser
    const browser = await chromium.launch({ headless: false });

    // Open a new page
    const page = await browser.newPage();

    // Navigate to a URL
    await page.goto('https://example.com');

    // Take a screenshot
    await page.screenshot({ path: 'screenshot.png' });

    // Close the browser
    await browser.close();
})();
