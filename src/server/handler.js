const predictClassification = require('../services/inferenceService');
const crypto = require('crypto');
const { storeData, storeGetAll } = require("../services/storeData");

async function postPredictHandler(request, h) {
  const { image } = request.payload;
  const { model } = request.server.app;

  const { confidenceScore, label, suggestion } = await predictClassification(model, image);
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const data = {
    "id": id,
    "result": label,
    "suggestion": suggestion,
    "confidenceScore": confidenceScore,
    "createdAt": createdAt
  }

  await storeData(id,data);

  const response = h.response({
    status: 'success',
    message: confidenceScore > 99 ? 'Model is predicted successfully' : 'Model is predicted successfully but under threshold. Please use the correct picture',
    data
  })
  response.code(201);
  return response;
}

async function getPredictHistories(request, h) {
  const histories = await storeGetAll();

  const response = h.response({
    status: "success",
    data: histories,
  });
  response.code(200);
  return response;
}

module.exports = {
  postPredictHandler,
  getPredictHistories
};