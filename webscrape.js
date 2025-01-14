const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
    // Launch the browser
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    // Navigate to the target URL
    const url = 'https://webscraper.io/test-sites/e-commerce/allinone';
    await page.goto(url);

    console.log(`Navigated to ${url}`);

    // Scrape product details
    const products = await page.$$eval('.product-wrapper', (productCards) =>
        productCards.map((card) => {
            const title = card.querySelector('.title')?.innerText.trim() || '';
            const price = card.querySelector('.price')?.innerText.trim() || '';
            const description = card.querySelector('.description')?.innerText.trim() || '';
            let cheap = false;
            if (price.substring(1, price.length) < 1000) {
                cheap = true;
            }
            return { title, price, description, cheap };
        })
    );
    console.log(`Scraped ${products.length} products.`);

    // Save data to a JSON file
    const outputFile = 'products.json';
    fs.writeFileSync(outputFile, JSON.stringify(products, null, 2));

    console.log(`Data saved to ${outputFile}`);

    // Close the browser
    await browser.close();
})();
