const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Path to your model.json file
const modelPath = './models/redness_tfjs/model.json';

// Function to load and preprocess image
async function loadImage(imagePath) {
    // Load image using sharp
    const imageBuffer = await sharp(imagePath)
        .resize(150, 150) // Resize to target size
        .toBuffer();

    // Decode image buffer to a tensor
    let tensor = tf.node.decodeImage(imageBuffer, 3);

    // Normalize the image data
    tensor = tensor.div(tf.scalar(255.0));

    // Expand dimensions to match the model input
    tensor = tensor.expandDims();

    return tensor;
}

// Function to predict acne or noacne
async function predict(imagePath) {
    // Load the pre-trained model
    const model = await tf.loadGraphModel(`file://${path.resolve(modelPath)}`);

    // Preprocess the image
    const imageTensor = await loadImage(imagePath);

    // Make prediction
    const prediction = model.predict(imageTensor);

    // Get the prediction result
    const classes = prediction.dataSync()[0];
    console.log(classes*1000);

    imgScore = classes * 1000;
    if (imgScore > 0.5) {
        console.log("noacne");
    } else {
        console.log("acne");
    }
}

// Path to the image you want to classify
const imagePath = './nauval.test';

// Call the predict function
predict(imagePath).catch(console.error);
