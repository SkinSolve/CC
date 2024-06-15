const { postPredictHandler, getPredictHistories } = require('./handler');

const routes = [
  {
    path: '/predict',
    method: 'POST',
    handler: postPredictHandler,
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: true,
        maxBytes: 1000000 // maksimum 1MB
      }
    }
  },
  {
    path: "/predict/histories",
    method: "GET",
    handler: getPredictHistories,
  }
];

module.exports = routes;
