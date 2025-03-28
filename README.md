# 💬 ChatGPT Scraper Challenge
This project is a CLI-based automation script built with **Node.js** and **Puppeteer**, designed to:
✅ Log into ChatGPT  
✅ Send a prompt and capture the response  
✅ Send a reply prompt and capture the second response  
✅ Save the full conversation to a CSV file  
✅ Support multi-factor authentication (MFA) manually  
✅ Run inside Docker or locally  

## 🚀 How It Works

1. **Starts a headless browser** with optional proxy and custom user-agent  
2. **Logs into https://chatgpt.com** using the provided email and password  
3. **Handles 2FA manually** (if required)  
4. **Sends initial prompt**, waits for ChatGPT’s response  
5. **Sends reply prompt**, captures second response  
6. **Saves full conversation** into `src/data/conversations.csv`

## 🧰 Installation

```bash
# Clone the repository
git clone https://github.com/emirercan/chatgpt-scraper-challenge
cd chatgpt-scraper-challenge

# Install dependencies
npm install
  ```

## ⚙️ CLI Usage
```bash
node index.js \
  --email="your@email.com" \
  --password="yourPassword" \
  --prompt="What is Node.js?" \
  --reply="Can you explain the event loop?"
  ```
## 🛡️ Multi-Factor Authentication (2FA)
If ChatGPT prompts for a verification code (MFA):
-   The script will **pause execution**
    
-   You'll be prompted in the terminal:
```bash
🔐 Verification code required. Please enter the code manually.
✉️ After entering the code in the browser, press Enter to continue...
  ```
-   You manually enter the code in the browser window
    
-   Hit **Enter** in terminal to continue

## 📁 CSV Output

Conversation data is saved to:

Conversation data is saved to:

```bash
src/data/conversations.csv
  ```

---

## 🙌 Final Notes



This challenge was both fun and insightful to build.  
I approached it just as I would in a real-world project: by prioritizing **clean code**, **modular design**, and handling **realistic scraping constraints** such as MFA, dynamic DOM handling, and structured logging.

While this is a **demo project**, and some edge cases (such as entering an incorrect MFA code) are not fully handled, the structure is designed to be easily extendable and production-ready with minimal effort.

For rapid prototyping, I used **Puppeteer** instead of Playwright — a conscious choice to reduce environment setup friction and focus on core logic.

All the code in this repository was written by myself, with a few sections (e.g. log formatting or terminal input handling) aided or accelerated through AI-assisted development tools — always under my direct understanding and control.

If there’s anything you’d like me to improve, extend, or explain in more detail, I’d be happy to dive in.

Thanks again for reviewing!

— Emir Ercan
