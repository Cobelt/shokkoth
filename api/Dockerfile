FROM node:12

WORKDIR /api

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 5000

RUN yarn transpile

CMD ["yarn", "deploy"]
