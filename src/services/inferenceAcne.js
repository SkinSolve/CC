const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');

async function predictAcne(model, image) {
    try {
        const tensor = tf.node
            .decodeJpeg(image)
            .resizeNearestNeighbor([224, 224])
            .expandDims()
            .toFloat();

        const prediction = model.predict(tensor);
        const score = await prediction.data();
        const confidenceScore = Math.max(...score) * 100;

        const classes = ['No Acne', 'Acne'];

        const classResult = tf.argMax(prediction, 1).dataSync()[0];

        let label;
        let suggestion;

        if (classResult === 1) {
            label = classes[1];
            suggestion = "Wajah anda terindikasi berjerawat, segera lakukan perawatan wajah";
        } else {
            label = classes[0];
            suggestion = "Kulit wajah anda sehat!";
        }

        return { confidenceScore, label, suggestion };
    } catch (error) {
        throw new InputError(`Terjadi kesalahan dalam melakukan prediksi acne`);
    }
}

module.exports = predictAcne;
