FROM node:18-alpine
LABEL authors="ilya"

WORKDIR /react-app/

COPY ./package.json /react-app/
COPY ./public /react-app/public
COPY ./src /react-app/src

RUN npm install -g react-scripts
RUN npm install
EXPOSE 3000

CMD ["npm", "start"]