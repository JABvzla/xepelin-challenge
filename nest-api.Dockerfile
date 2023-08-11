FROM node:18-slim

WORKDIR /app

COPY .env .
COPY package.json .
COPY application ./application
COPY domain ./domain
COPY infrastructure/nest-api ./infrastructure/nest-api

RUN ls -la ./*

RUN npm install
WORKDIR /app/infrastructure/nest-api
RUN npm install

EXPOSE 8080

CMD [ "npm", "run", "start:dev" ]
