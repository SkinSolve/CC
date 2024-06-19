const tf = require('@tensorflow/tfjs-node');

async function loadModel() {
    const modelUrls = [
        "file://skinsolve-backend/models/acne_tfjs_saved/model.json",
        "file://skinsolve-backend/models/redness_tfjs_saved/model.json",
        "file://skinsolve-backend/models/skintype_tfjs_saved/model.json"
    ];

    const models = [];

    for (const url of modelUrls) {
        const model = await tf.loadLayersModel(url);
        models.push(model);
    }

    return models;
}

module.exports = loadModel;