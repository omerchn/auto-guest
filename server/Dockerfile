FROM node:16-alpine

WORKDIR /app/server
COPY package*.json ./
RUN npm ci
COPY . ./
EXPOSE 4000

CMD xvfb-run --auto-servernum npm start