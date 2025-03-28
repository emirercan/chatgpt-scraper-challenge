const startScraper = require('../core/startScraper');
const logger = require('@logger');
const selectors = require('@constants/selectors');
const loginUser = require('../auth/loginUser');
const handleTwoFactorAuth = require('../auth/handleTwoFactorAuth');
const sendPromptAndGetResponse = require('./sendPromptAndGetResponse');
const logConversationToCsv = require('@utils/logConversationToCsv');

scrapeChatGPTConversation = async (data) => {
    const { email, password, prompt, reply } = data;
    let browser = null;
    try {
        const { browser: br, page, sessionId } = await startScraper();
        browser = br;

        logger.info(`🧪 Browser session started: ${sessionId}`)

        await loginUser(page, email, password);

        const loginResult = await Promise.race([
            page.waitForSelector(selectors.verificationPage, { visible: true, timeout: 10000 }).then(() => 'mfa'),
            page.waitForSelector(selectors.passwordInput, { visible: true, timeout: 10000 }).then(() => 'ready')
        ]);

        // Handle MFA if required
        if (loginResult === 'mfa') {
            await handleTwoFactorAuth(page);
            // Wait for prompt after MFA
            await page.waitForSelector(selectors.promptInput, { visible: true, timeout: 100000 });
            logger.info('🔓 2FA successful, ChatGPT screen is ready.');
        } else {
            logger.info('🔓 MFA was not requested, proceeding directly to ChatGPT prompt.');
        }

        // Send the first prompt and get its response
        const firstResponse = await sendPromptAndGetResponse(page, prompt);
        console.log('First response:', firstResponse);

        // Send the second prompt (reply) and get its response
        const secondResponse = await sendPromptAndGetResponse(page, reply);
        console.log('Second response:', secondResponse);

        logConversationToCsv({
            sessionId,
            timestamp: Date.now(),
            prompt,
            firstResponse,
            reply,
            secondResponse
        });

    } catch (error) {
        logger.error('🚨 An error occurred:', error.stack);
    } finally {
        // Ensure the browser is closed
        if (browser) {
            logger.info('🔒 Closing browser...');
            await browser.close();
            logger.info('🛑 Browser closed.');
        }
    }
}

module.exports = scrapeChatGPTConversation;