require('module-alias/register');
const logger = require('@logger');
const scrapeChatGPTConversation = require('@scrapers/chatgpt/scrapeChatGPTConversation')

const args = require('minimist')(process.argv.slice(2));
const { email, password, prompt, reply } = args;


if (!email || !password || !prompt || !reply) {
    logger.error('Missing required arguments. Usage:');
    logger.log('--email=... --password=... --prompt=... --reply=...');
    process.exit(1);
}

logger.info(`Input Received: Email: ${email}, Password: ${password}, Prompt: ${prompt}, Reply: ${reply}`);


scrapeChatGPTConversation({ email, password, prompt, reply })
    .then(() => console.log('✅ Scraping completed.'))
    .catch((err) => console.error('❌ Error:', err.message));
