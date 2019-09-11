const puppeteer = require('puppeteer');
const twitter = require('./twitter');

(async () => {

    const USERNAME = 'riwopepob@rich-mail.net';
    const PASSWORD = 'JustATest';

    await twitter.initialize();
    await twitter.login(USERNAME, PASSWORD);

    debugger;
  
  // await browser.close();
})();