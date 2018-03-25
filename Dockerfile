FROM node:8.9-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY . .
EXPOSE 10010
CMD [ "node", "app.js" ]