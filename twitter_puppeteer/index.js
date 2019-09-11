const puppeteer = require('puppeteer');

(async () => {

    const BASE_URL = 'https://twitter.com';
    const LOGIN_URL = 'https://twitter.com/login';
    const USERNAME = 'riwopepob@rich-mail.net';
    const PASSWORD = 'JustATest';

    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.goto(LOGIN_URL);

    await page.waitFor('.js-username-field');
    await page.type('.js-username-field', USERNAME);
    await page.type('.js-password-field', PASSWORD);
    await page.click('button[type="submit"]');

    debugger;
  
  // await browser.close();
})();