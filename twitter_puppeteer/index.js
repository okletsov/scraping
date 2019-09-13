const credentials = require('./credentials');

const puppeteer = require('puppeteer');
const twitter = require('./twitter');

(async () => {

    const USERNAME = credentials.username;
    const PASSWORD = credentials.password;

    await twitter.initialize();
    await twitter.login(USERNAME, PASSWORD);
    await twitter.postTweet('just a test');

    debugger; 
  
  // await browser.close();
})();