FROM node:12-slim

WORKDIR /app

COPY package*.json /app/
COPY . /app/

RUN npm i

CMD npm start
EXPOSE 3000
