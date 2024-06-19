const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');

async function predictSkinType(model, image) {
    try {
        const tensor = tf.node
            .decodeJpeg(image)
            .resizeNearestNeighbor([224, 224])
            .expandDims()
            .toFloat();

        const prediction = model.predict(tensor);
        const score = await prediction.data();
        const confidenceScore = Math.max(...score) * 100;

        const classes = ['Oily', 'Dry', 'Normal', 'Combination'];

        const classResult = tf.argMax(prediction, 1).dataSync()[0];

        let label;
        let suggestion;

        switch (classResult) {
            case 0:
                label = classes[0];
                suggestion = "Anda memiliki jenis kulit berminyak. Gunakan produk sesuai dengan kebutuhan kulit berminyak.";
                break;
            case 1:
                label = classes[1];
                suggestion = "Anda memiliki jenis kulit kering. Pastikan untuk menggunakan pelembap yang cocok untuk kulit kering.";
                break;
            case 2:
                label = classes[2];
                suggestion = "Anda memiliki jenis kulit normal. Pilihlah produk perawatan kulit yang sesuai dengan kondisi kulit normal Anda.";
                break;
            case 3:
                label = classes[3];
                suggestion = "Anda memiliki jenis kulit kombinasi. Gunakan produk yang dapat menjaga keseimbangan antara area berminyak dan kering.";
                break;
            default:
                label = "Unknown";
                suggestion = "Informasi mengenai jenis kulit tidak ditemukan.";
        }

        return { confidenceScore, label, suggestion };
    } catch (error) {
        throw new InputError(`Terjadi kesalahan dalam melakukan prediksi skintype`);
    }
}

module.exports = predictSkinType;
