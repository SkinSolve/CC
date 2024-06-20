const predictClassification = require("./inferenceService");
const crypto = require("crypto");
const { storeData, storeGetAll } = require("./storeData");

async function postPredictHandler(req, res) {
  const { image } = req.body;
}

module.exports = postPredictHandler;
