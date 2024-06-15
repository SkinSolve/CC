const tf = require("@tensorflow/tfjs-node");
const handler = tf.io.fileSystem("./models/acne_tfjs/model.json");

// import * as tf from '@tensorflow/tfjs';

const model = tf.loadLayersModel(handler);

model.weights.forEach(w => {
 console.log(w.name, w.shape);
});



