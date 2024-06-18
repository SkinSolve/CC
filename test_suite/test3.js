const tfn = require('@tensorflow/tfjs-node');
const tf = require('@tensorflow/tfjs');
const fs = require('fs');

// Load the model
async function loadModel() {
  const handler = tfn.io.fileSystem('./models/acne_tfjs/model.json');
  const model = await tf.loadLayersModel(handler);
  return model;
}

// Function to load and preprocess image
async function loadAndPreprocessImage(imgPath) {
  const imageBuffer = fs.readFileSync(imgPath); // Read image file
  const tensor = tf.node.decodeImage(imageBuffer, 3) // Decode as RGB
    .resizeBilinear([150, 150]) // Resize to (150, 150)
    .expandDims(0) // Add batch dimension at the beginning
    .toFloat()
    .div(tf.scalar(255.0)); // Normalize to [0, 1]

  return tensor;
}

// Main function to load model and predict
async function main() {
  try {
    const model = await loadModel();
    console.log('Model loaded');

    const tensor = await loadAndPreprocessImage('./naups.jpeg');

    const prediction = model.predict(tensor);
    const score = await prediction.data(); // Use await since prediction.data() is async

    const predictionScore = score[0]; // Assuming the model returns a list with one item
    const predictionClass = predictionScore > 0.2 ? 'Acne' : 'No Acne';

    console.log('Prediction Score:', predictionScore);
    console.log('Prediction Class:', predictionClass);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
