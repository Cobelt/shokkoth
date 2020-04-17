FROM node:12
MAINTAINER Cobelt Dierk <cobelt60@gmail.com>

WORKDIR /shokkoth

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 3000

RUN yarn build

CMD ["yarn", "deploy"]
