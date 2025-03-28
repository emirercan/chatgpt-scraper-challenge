
const logger = require('@logger');
const selectors = require('@constants/selectors');
const askQuestion = require('@utils/askQuestion');
const typeLikeHuman = require('../chatgpt/typeLikeHuman');
const randomDelay = require('@utils/randomDelay');

const handleTwoFactorAuth = async (page) => {
    logger.info('🔐 Waiting for 2FA step...');

    // Prompt user for 2FA code
    const code = await askQuestion('📨 Please enter your 2FA code: ');

    // Type 2FA code
    await page.waitForSelector(selectors.verificationPageInput, { visible: true, timeout: 10000 });
    await typeLikeHuman(page, selectors.verificationPageInput, code);
    await randomDelay();
    logger.info('🟢 2FA code entered.');

    // Submit 2FA code
    await page.waitForSelector(selectors.submitButton, { visible: true, timeout: 100000 });
    await page.click(selectors.submitButton);
    logger.info('🟢 2FA submission sent.');
}

module.exports = handleTwoFactorAuth;