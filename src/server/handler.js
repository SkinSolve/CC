const { predictAcne } = require('../services/inferenceAcne');
const { predictRedness } = require('../services/inferenceRedness');
const { predictSkinType } = require('../services/inferenceSkinType');
const crypto = require('crypto');
const { storeData, storeGetAll } = require("../services/storeData");

async function postPredictHandler(request, h) {
  const { image, feature } = request.payload;
  const { model } = request.server.app;

  let result;

  try {
    switch (feature){
      case 'acne':
        result = await predictAcne(model, image);
        break;
      case 'redness':
        result = await predictRedness(model, image);
        break;
      case 'skintype':
        result = await predictSkinType(model, image);
        break;
      default:
        return h.response({
          status: 'error',
          message: 'Invalid feature specified'
        }).code(400);
    }
   
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    // Prepare data for storage
    const data = {
      "id": id,
      "result": result.label,
      "suggestion": result.suggestion,
      "confidenceScore": result.confidenceScore,
      "createdAt": createdAt
    };

  await storeData(id,data);

  const response = h.response({
    status: 'success',
    message: 'Models are predicted successfully',
    data
  });
  response.code(201);
  return response;
  } catch (error) {
    console.error('Error in prediction:', error);
    const response = h.response({
      status: 'error',
      message: 'Failed to predict models',
      error: error.message
    });
    response.code(500);
    return response;
  }
}

async function getPredictHistories(request, h) {
  try {
    const histories = await storeGetAll();

    const response = h.response({
      status: 'success',
      data: histories
    });
    response.code(200);
    return response;
  } catch (error) {
    console.error('Error fetching histories:', error);
    const response = h.response({
      status: 'error',
      message: 'Failed to fetch prediction histories',
      error: error.message
    });
    response.code(500);
    return response;
  }
}

module.exports = {
  postPredictHandler,
  getPredictHistories
};
