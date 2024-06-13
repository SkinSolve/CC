FROM node:22

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3000

ENV MODEL_URL_1=https://storage.googleapis.com/bucket-skinsolve-1/acne_tfjs/model.json
ENV MODEL_URL_2=https://storage.googleapis.com/bucket-skinsolve-1/redness_tfjs/model.json
ENV MODEL_URL_3=https://storage.googleapis.com/bucket-skinsolve-1/skintype_tfjs/model.json

CMD [ "npm", "start" ]