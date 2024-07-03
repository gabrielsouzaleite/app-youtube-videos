FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

COPY favorites.json ./dist/favorites.json

RUN npm install -g typescript

RUN tsc

EXPOSE 8002

CMD [ "node", "dist/server.js" ]
