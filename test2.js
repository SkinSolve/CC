const tf = require("@tensorflow/tfjs");

async function loadModel() {
  const model = await tf.loadLayersModel("file://./models/skintype_tfjs/model.json");
  model.weights.forEach(w => {
    console.log(w.name, w.shape);
  });
}

loadModel();
