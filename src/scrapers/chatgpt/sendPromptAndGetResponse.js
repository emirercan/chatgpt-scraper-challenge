
const logger = require('@logger');
const selectors = require('@constants/selectors');
const typeLikeHuman = require('./typeLikeHuman');

const sendPromptAndGetResponse = async (page, prompt) => {
    logger.info(`✍️ Sending prompt: "${prompt.slice(0, 30)}..."`);

    // Focus on the prompt input and type
    await page.waitForSelector(selectors.promptInput, { visible: true, timeout: 10000 });
    await page.focus(selectors.promptInput);
    await typeLikeHuman(page, selectors.promptInput, prompt);
    await page.keyboard.press('Enter');

    // Wait for "Stop" button to appear, indicating ChatGPT is generating output
    await page.waitForSelector(selectors.stopButton, { visible: true, timeout: 10000 });
    logger.info('🟢 ChatGPT is generating a response...');

    // Wait for the "Stop" button to disappear, indicating the response is complete
    await page.waitForSelector(selectors.stopButton, { hidden: true, timeout: 100000 });
    logger.info('✅ ChatGPT finished generating the response.');

    // Retrieve the last response from the page
    const response = await page.evaluate(() => {
        const articles = document.querySelectorAll('article');
        const lastArticle = articles[articles.length - 1];
        return lastArticle?.innerText.trim() || '';
    });

    logger.info(`📝 Received response (first 30 chars): "${response.slice(0, 30)}..."`);
    return response;
}

module.exports = sendPromptAndGetResponse;