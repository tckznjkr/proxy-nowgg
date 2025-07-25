FROM node:18

# Instala dependências
RUN apt-get update && apt-get install -y wget gnupg ca-certificates fonts-liberation libappindicator3-1 libasound2 libatk-bridge2.0-0 libatk1.0-0 libcups2 libdbus-1-3 libgdk-pixbuf2.0-0 libnspr4 libnss3 libx11-xcb1 libxcomposite1 libxdamage1 libxrandr2 xdg-utils

# Instala o Chromium (usado pelo Puppeteer)
RUN apt-get install -y chromium

# Cria diretório de app
WORKDIR /app
COPY . .

# Instala dependências Node.js
RUN npm install

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

EXPOSE 3000
CMD ["node", "index.js"]
