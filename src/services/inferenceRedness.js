const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');

async function predictRedness(model, image) {
    try {
        const tensor = tf.node
            .decodeJpeg(image)
            .resizeNearestNeighbor([224, 224])
            .expandDims()
            .toFloat();

        const prediction = model.predict(tensor);
        const score = await prediction.data();
        const confidenceScore = Math.max(...score) * 100;

        const classes = ['No Redness', 'Redness'];

        const classResult = tf.argMax(prediction, 1).dataSync()[0];

        let label;
        let suggestion;

        if (classResult === 1) {
            label = classes[1];
            suggestion = "Segera konsultasikan ke dokter kulit!";
        } else {
            label = classes[0];
            suggestion = "Anda tidak mengalami kemerahan pada kulit.";
        }

        return { confidenceScore, label, suggestion };
    } catch (error) {
        throw new InputError(`Terjadi kesalahan dalam melakukan prediksi redness`);
    }
}

module.exports = predictRedness;
