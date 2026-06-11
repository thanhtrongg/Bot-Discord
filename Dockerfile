FROM node:22-slim

RUN apt-get update \
    && apt-get install -y ffmpeg fontconfig \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev

COPY . .

RUN ffmpeg -version

CMD ["npm", "start"]