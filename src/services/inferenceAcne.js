const tf = require('@tensorflow/tfjs-node');
const { createCanvas, loadImage } = require('canvas');
const InputError = require('../exceptions/InputError');

async function predictAcne(model, image) {
    try {
        const canvas = createCanvas(150, 150);
        const ctx = canvas.getContext('2d');
        const img = await loadImage(image);
        ctx.drawImage(img, 0, 0, 150, 150);
        const tensor = tf.browser.fromPixels(canvas).expandDims();
        
        // Make prediction
        const prediction = model.predict(tensor);
        const scores = await prediction.data();
        
        // Adjusted prediction logic based on the notebook
        const predictionScore = scores[1]; // Assuming index 1 corresponds to 'Acne' class

        const confidenceScore = predictionScore * 100;
        const predictedClassIdx = predictionScore > 0.5 ? 1 : 0;

        // Define classes
        const classes = ['No Acne', 'Acne'];

        const label = classes[predictedClassIdx];
        const suggestion = predictedClassIdx === 1 ?
            "Wajah anda terindikasi berjerawat, segera lakukan perawatan wajah" :
            "Kulit wajah anda sehat!";

        return { confidenceScore, label, suggestion };
    } catch (error) {
        throw new InputError(`Error predicting acne: ${error.message}`);
    }
}

module.exports = predictAcne;