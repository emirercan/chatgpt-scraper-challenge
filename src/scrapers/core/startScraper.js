const logger = require('@logger');

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const getUserAgent = require('./getUserAgent');
const getProxy = require('./getProxy');

const StartScraper = async (useProxy = false) => {
    const loginUrl = 'https://chatgpt.com/auth/login'

    const optArgs = [
        '--start-maximized',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-gpu',
        '--no-zygote',
        '--disable-features=AudioServiceOutOfProcess',
        '--disable-dev-shm-usage',
        '--disable-web-security',
        '--disable-features=IsolateOrigins,site-per-process',
    ];

    // Optional proxy integration
    let proxy = useProxy ? await getProxy() : null;

    if (proxy) {
        optArgs.push(`--proxy-server=${proxy.host}:${proxy.port}`);
        logger.info(`🛡️ Proxy enabled → ${proxy.host}:${proxy.port}`);
    }

    const options = {
        headless: true,
        args: optArgs,
        defaultViewport: null,
        waitUntil: 'networkidle2',
    };

    const browser = await puppeteer.launch(options);
    const wsEndpoint = browser.wsEndpoint();
    const sessionId = wsEndpoint.slice(wsEndpoint.lastIndexOf('/') + 1);
    browser.SessionId = sessionId;

    const page = (await browser.pages())[0];

    // Set custom user agent
    await page.setUserAgent(getUserAgent());

    // Authenticate proxy if credentials are provided
    if (proxy?.username && proxy?.password) {
        await page.authenticate({
            username: proxy.username,
            password: proxy.password,
        });
    }

    await page.goto(loginUrl, {
        waitUntil: 'networkidle2',
        timeout: 15000
    });

    const result = {
        browser,
        page,
        sessionId: browser.SessionId,
    };

    return result;
};

module.exports = StartScraper;
