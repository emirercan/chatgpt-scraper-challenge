FROM ghcr.io/puppeteer/puppeteer:24.4.0

USER root

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENTRYPOINT ["node", "index.js"]
