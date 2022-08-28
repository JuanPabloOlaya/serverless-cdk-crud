FROM node:14.20.0

WORKDIR /asset-input

COPY package.json ./
COPY tsconfig.json ./
COPY src ./src

RUN npm i && npm run build