FROM node:12

WORKDIR /api

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 4000

RUN yarn transpile

CMD ["yarn", "deploy"]
