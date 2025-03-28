const randomDelay = require('@utils/randomDelay');

/*
 Types a string into an element one character at a time, with random delays between keystrokes.
*/
const typeLikeHuman = async (page, selector, text) => {
    for (const char of text) {
        await page.type(selector, char);
        await randomDelay(50, 150);
    }
};

module.exports = typeLikeHuman;