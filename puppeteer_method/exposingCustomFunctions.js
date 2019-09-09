const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
      headless: false
  });
  const page = await browser.newPage();
  await page.goto('https://learnscraping.com', {waitUntil: 'networkidle0'});

  // Get details from the page
  let details = await page.evaluate(() => {
      return {
          title: document.querySelector('h1[class="site-title"]').innerText,
          description: document.querySelector('p[class="site-description"]').innerText,
          invalid: document.querySelector('test[class="test"]') ? document.querySelector('test[class="test"]').innerText : false
      }
  });
  
  debugger;
  
  // await browser.close();
})();