FROM node:16-alpine

COPY . /usr/app/
WORKDIR /usr/app/
RUN npm install -g nodemon && npm install

EXPOSE 3000

#ENTRYPOINT [ "bash -c\"npm run dev\"" ]
CMD npm run dev
