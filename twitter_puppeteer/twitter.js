const puppeteer = require('puppeteer');

const BASE_URL = 'https://twitter.com';
const LOGIN_URL = 'https://twitter.com/login';

let browser = null;
let page = null;

const twitter = {
    initialize: async () => {
        browser = await puppeteer.launch({
            headless: false
        });
        
        page = await browser.newPage();
        await page.setViewport({
            width: 1024,
            height: 768,
            deviceScaleFactor: 1,
          });
        await page.goto(BASE_URL);
    },

    login: async (username, password) => {
        await page.goto(LOGIN_URL);

        await page.waitFor('.js-username-field');
        await page.type('.js-username-field', username);
        await page.type('.js-password-field', password);
        await page.click('button[type="submit"]');
        await page.waitFor('.DraftEditor-editorContainer');
    },

    postTweet: async (message) => {
        await page.waitFor('.DraftEditor-editorContainer');
        await page.click('.DraftEditor-editorContainer');
        await page.waitFor('.public-DraftEditorPlaceholder-hasFocus');
        await page.keyboard.type(message);
        await page.click('[data-testid="tweetButtonInline"]');
    },

    end: async () => {
        await browser.close();
    }
};

module.exports = twitter;