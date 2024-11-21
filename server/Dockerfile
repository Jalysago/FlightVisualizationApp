FROM node:22.11.0

WORKDIR /fligh_visualization

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD [ "node", "server.js" ]