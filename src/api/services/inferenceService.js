const tf = require("@tensorflow/tfjs-node");
const loadModel = require("./loadModel");

async function predictClassification(image) {
  try {
    // Decode image buffer to a tensor
    let tensor = tf.node
      .decodeJpeg(image)
      .resizeNearestNeighbor([150, 150])
      .expandDims()
      .toFloat();

    // Load model
    const model = await loadModel();

    // start predictions
    const acnePrediction = await model.acne.predict(tensor);
    const rednessPrediction = await model.redness.predict(tensor);
    const skintypePrediction = await model.skintype.predict(tensor);

    // set score
    const confidenceAcne = acnePrediction.dataSync()[0];
    const confidenceRedness = rednessPrediction.dataSync()[0];
    const confidenceSkintype = skintypePrediction.dataSync()[0];
    const acneScore = confidenceAcne * 100;
    const rednessScore = confidenceRedness * 100;
    const skintypeScore = confidenceSkintype * 100;

    // classification
    const acneClasses = ["Tidak Berjerawat", "Berjerawat"];
    const rednessClasses = ["Tidak Kemerahan", "Kemerahan"];
    const skintypeClasses = ["Tidak Berminyak", "Berminyak"];

    // we do that everyone has it
    let acneLabel = "Berjerawat";
    let rednessLabel = "Kemerahan";
    let skintypeLabel = "Berminyak";

    // Double check
    if (acneScore <= 50) {
      acneLabel = "Tidak Berjerawat";
    } else {
      acneLabel = "Berjerawat";
    }

    if (rednessScore <= 50) {
      rednessLabel = "Tidak Kemerahan";
    } else {
      rednessLabel = "Kemerahan";
    }

    if (skintypeScore <= 50) {
      skintypeLabel = "Tidak Berminyak";
    } else {
      skintypeLabel = "Berminyak";
    }

    // suggestion
    let acneSuggestion, rednessSuggestion, skintypeSuggestion;

    if (acneLabel === "Berjerawat") {
      acneSuggestion = "Sebaiknya gunakan sabun wajah dari Wardah";
    } else {
      acneSuggestion =
        "Wajah anda bebas jerawat, ingat untuk selalu membershkan wajah dengan Skintific";
    }

    if (rednessLabel === "Kemerahan") {
      rednessSuggestion =
        "Sebaiknya hati-hati dengan perawatan ekstrim pembersih tidak berstatus BPOM";
    } else {
      rednessSuggestion =
        "Wajah anda bebas kulit sensitif, jangan lupa menjaga wajah anda dengan Shinzui";
    }

    if (skintypeLabel === "Berminyak") {
      skintypeSuggestion = "Sebaiknya gunakan pelembab Fair n Lovely";
    } else {
      skintypeSuggestion =
        "Wajah anda lembut dan bebas dari minyak berlebih, ingat untuk selalu gunakan sabun Dettol";
    }

    return {
      acneScore,
      rednessScore,
      skintypeScore,
      acneLabel,
      rednessLabel,
      skintypeLabel,
      acneSuggestion,
      rednessSuggestion,
      skintypeSuggestion,
    };
  } catch (error) {
    console.log("Kesalahan");
  }
}

module.exports = { predictClassification };
