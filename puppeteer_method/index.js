const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
      headless: false
  });
  const page = await browser.newPage();
  await page.goto('https://google.com');
  await page.type('.gLFyf.gsfi', 'Udemy Tutorial', {delay: 100}); // Types slower, like a user
  await page.keyboard.press('Enter');
  await page.waitForNavigation();
  await page.screenshot({path: 'example.png'});
  await browser.close();
})();