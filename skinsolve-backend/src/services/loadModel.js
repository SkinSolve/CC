const tf = require('@tensorflow/tfjs-node');

async function loadModel() {
    const modelUrls = [
        "file://skinsolve-backend/models/acne_tfjs/model.json",
        "file://skinsolve-backend/models/redness_tfjs/model.json",
        "file://skinsolve-backend/models/skintype_tfjs/model.json"
      ];
    return tf.loadLayersModel(process.env.MODEL_URL);
}

module.exports = loadModel;