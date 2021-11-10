FROM node:16-alpine

WORKDIR /usr/app/
COPY package.json .
RUN npm install -g nodemon \
  && npm install

EXPOSE 3000

CMD npm run dev