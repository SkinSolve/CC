const predictClassification = require("./inferenceService");
const crypto = require("crypto");
const { storeData, storeGetAll } = require("./storeData");

async function postPredictHandler(req, res) {
  const { image } = req.body;
  const {
    acneScore,
    rednessScore,
    skintypeScore,
    acneLabel,
    rednessLabel,
    skintypeLabel,
    acneSuggestion,
    rednessSuggestion,
    skintypeSuggestion,
  } = await predictClassification(image);

  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const data = {
    id: id,
    result: {
      acne: acneLabel,
      redness: rednessLabel,
      skintype: skintypeLabel,
    },
    suggestion: {
      acne: acneSuggestion,
      redness: rednessSuggestion,
      skintype: skintypeSuggestion,
    },
    confidenceScore: {
      acne: acneScore,
      redness: rednessScore,
      skintype: skintypeScore,
    },
    createdAt: createdAt,
  };

  await storeData(id, data);

  let response;
  return response;
}

async function getPredictHistories(req, res) {
  const histories = await storeGetAll();
  let response;
  return response;
}

module.exports = postPredictHandler;
