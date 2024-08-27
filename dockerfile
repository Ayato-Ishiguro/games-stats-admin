FROM node:18.14.1-alpine

WORKDIR /app

RUN npm i -g @nestjs/cli
COPY ./package.json .
COPY ./package-lock.json .
RUN npm install