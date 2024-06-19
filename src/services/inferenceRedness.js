const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');

async function predictRedness(model, image) {
    try {
        const tensor = tf.node
            .decodeJpeg(image)
            .resizeNearestNeighbor([150, 150]) // Adjust according to the model's input size
            .expandDims()
            .toFloat();

        const prediction = model.predict(tensor);
        const scores = await prediction.data();
        
        // Adjusted prediction logic based on the notebook
        const predictionScore = scores[1];  // Assuming index 1 corresponds to 'Redness' class

        const confidenceScore = predictionScore * 100;
        const predictedClassIdx = predictionScore > 0.5 ? 1 : 0;

        const classes = ['No Redness', 'Redness'];

        const label = classes[predictedClassIdx];
        const suggestion = predictedClassIdx === 1 ?
            "Kulit anda mengalami kemerahan, segera konsultasikan ke dokter kulit!" :
            "Anda tidak mengalami kemerahan pada kulit.";

        return { confidenceScore, label, suggestion };
    } catch (error) {
        throw new InputError(`Error predicting redness: ${error.message}`);
    }
}

module.exports = predictRedness;