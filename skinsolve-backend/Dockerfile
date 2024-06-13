FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3000

ENV MODEL_URL_1=file://skinsolve-backend/models/acne_tfjs/model.json
ENV MODEL_URL_2=file://skinsolve-backend/models/redness_tfjs/model.json
ENV MODEL_URL_3=file://skinsolve-backend/models/skintype_tfjs/model.json

CMD [ "npm", "start" ]