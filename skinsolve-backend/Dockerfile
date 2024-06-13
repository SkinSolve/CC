FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3000

ENV MODEL_URL_1=
ENV MODEL_URL_2=
ENV MODEL_URL_3=

CMD [ "npm", "start" ]