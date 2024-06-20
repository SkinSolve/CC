const { predictClassification } = require("./inferenceService");
const crypto = require("crypto");
const { storeGetById, storeData, storeGetAll } = require("./storeData");

async function getPredictionById(req, res) {
  const { id } = req.params;

  try {
    const prediction = await storeGetById(id);

    if (!prediction) {
      return res.status(404).json({
        status: "error",
        message: "Prediction not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: prediction,
    });
  } catch (error) {
    console.error(`Error while getting prediction by ID: ${error.message}`);
    return res.status(500).json({
      status: "error",
      message: "An error occurred while fetching prediction",
    });
  }
}

async function postPredictHandler(req, res) {
  try {
    // Assuming multer stores the uploaded file in req.file
    const image = req.file;

    if (!image) {
      return res.status(400).json({
        status: "error",
        message: "Image is required",
      });
    }

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
    } = await predictClassification(image.buffer); // Assuming predictClassification takes image buffer

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

    return res.status(201).json({
      status: "success",
      message: "Model is predicted successfully",
      data,
    });
  } catch (error) {
    console.error(
      `Error while processing the image prediction: ${error.message}`
    );
    return res.status(500).json({
      status: "error",
      message: "An error occurred while processing the image prediction",
    });
  }
}

async function getPredictHistories(req, res) {
  try {
    const histories = await storeGetAll();
    return res.status(200).json({
      status: "success",
      data: histories,
    });
  } catch (error) {
    console.error(`Error while getting prediction histories: ${error.message}`);
    return res.status(500).json({
      status: "error",
      message: "An error occurred while fetching prediction histories",
    });
  }
}

module.exports = { getPredictionById, postPredictHandler, getPredictHistories };
