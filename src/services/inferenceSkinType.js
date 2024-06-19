const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');

async function predictSkinType(model, image) {
    try {
        const tensor = tf.node
            .decodeJpeg(image)
            .resizeNearestNeighbor([150, 150]) // Adjust according to the model's input size
            .expandDims()
            .toFloat();

        const prediction = model.predict(tensor);
        const scores = await prediction.data();

        // Adjusted prediction logic based on the notebook
        const predictionScore = scores[0]; // Assuming index 0 corresponds to 'Dry' class

        const confidenceScore = predictionScore * 100;
        const predictedClassIdx = predictionScore > 0.5 ? 0 : 1; // Inverse logic due to different class order

        const classes = ['Dry', 'Oily']; // Order adjusted to match the notebook

        const label = classes[predictedClassIdx];
        const suggestion = predictedClassIdx === 1 ?
            "Anda memiliki jenis kulit berminyak. Gunakan produk sesuai dengan kebutuhan kulit berminyak." :
            "Anda memiliki jenis kulit kering. Pastikan untuk menggunakan pelembap yang cocok untuk kulit kering.";

        return { confidenceScore, label, suggestion };
    } catch (error) {
        throw new InputError(`Error predicting skin type: ${error.message}`);
    }
}

module.exports = predictSkinType;