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
        await page.goto(BASE_URL);
    },

    login: async (username, password) => {
        await page.goto(LOGIN_URL);

        await page.waitFor('.js-username-field');
        await page.type('.js-username-field', username);
        await page.type('.js-password-field', password);
        await page.click('button[type="submit"]');
    },

    end: async () => {
        await browser.close();
    }
};

module.exports = twitter;