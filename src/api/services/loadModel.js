const tf = require("@tensorflow/tfjs-node");
const model = require("../../config/model");
async function loadModel() {
  const models = {
    acne: tf.loadGraphModel(model.url.acne),
    redness: tf.loadGraphModel(model.url.redness),
    skintype: tf.loadGraphModel(model.url.skintype),
  };
  return models;
}

module.exports = loadModel;
