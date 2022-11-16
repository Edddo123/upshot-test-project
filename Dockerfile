FROM node:14
RUN npm install -g npm@latest

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

WORKDIR /app

CMD ["npm", "start"]
