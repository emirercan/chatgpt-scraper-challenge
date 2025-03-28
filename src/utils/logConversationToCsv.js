const fs = require('fs');
const path = require('path');
const logger = require('@logger');

const conversationsDir = path.join(__dirname, '../data');
const csvFilePath = path.join(conversationsDir, 'conversations.csv');


const logConversationToCsv = (data) => {
  const {
    sessionId,
    timestamp,
    prompt,
    firstResponse,
    reply,
    secondResponse
  } = data;

  // Ensure data directory exists
  if (!fs.existsSync(conversationsDir)) {
    fs.mkdirSync(conversationsDir, { recursive: true });
  }

  const csvRow = `"${escapeCsv(sessionId)}","${escapeCsv(timestamp)}","${escapeCsv(prompt)}","${escapeCsv(firstResponse)}","${escapeCsv(reply)}","${escapeCsv(secondResponse)}"\n`;

  if (!fs.existsSync(csvFilePath)) {
    const header = `"sessionId","timestamp","prompt","firstResponse","reply","secondResponse"\n`;
    fs.writeFileSync(csvFilePath, header + csvRow, 'utf8');
    logger.info(`📁 CSV file created and conversation logged at ${csvFilePath}`);
  } else {
    fs.appendFileSync(csvFilePath, csvRow, 'utf8');
    logger.info(`📄 Conversation appended to CSV at ${csvFilePath}`);
  }
};

const escapeCsv = (text) => {
  return String(text).replace(/"/g, '""');
};

module.exports = logConversationToCsv;