FROM node:18-alpine
LABEL authors="ilya"

COPY ./ ~/react-app/
WORKDIR ~/react-app/

ENTRYPOINT ["npm", "start"]