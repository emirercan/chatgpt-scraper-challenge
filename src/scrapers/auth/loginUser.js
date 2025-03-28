const logger = require('@logger');
const selectors = require('@constants/selectors');
const typeLikeHuman = require('../chatgpt/typeLikeHuman');
const randomDelay = require('@utils/randomDelay');

const loginUser = async (page, email, password) => {
    logger.info('🔐 Starting login process...');

    // Click on login button
    await page.waitForSelector(selectors.loginButton, { visible: true, timeout: 10000 });
    await page.click(selectors.loginButton);
    logger.info('🟢 Clicked on login button.');

    // Enter email
    await page.waitForSelector(selectors.emailInput, { visible: true, timeout: 10000 });
    await typeLikeHuman(page, selectors.emailInput, email);
    await randomDelay();
    logger.info('🟢 Email entered.');

    // Click on "Continue" after entering email
    await page.waitForSelector(selectors.submitInput, { visible: true, timeout: 10000 });
    await page.click(selectors.submitInput);
    logger.info('🟢 Email submitted, proceeding to password step.');

    // Enter password
    await page.waitForSelector(selectors.passwordInput, { visible: true, timeout: 10000 });
    await randomDelay();
    await typeLikeHuman(page, selectors.passwordInput, password);
    await randomDelay();
    logger.info('🟢 Password entered.');

    // Click on login submit button
    await page.waitForSelector(selectors.submitButton, { visible: true, timeout: 10000 });
    await page.click(selectors.submitButton);
    logger.info('🟢 Login request submitted.');
}

module.exports = loginUser;