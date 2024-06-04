const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');

async function predictClassification(model, image) {
  try {
    const tensor = tf.node
      .decodeJpeg(image)
      .resizeNearestNeighbor([224, 224])
      .expandDims()
      .toFloat()

    const prediction = model.predict(tensor);
    const score = await prediction.data();
    const confidenceScore = Math.max(...score) * 100;

    const classes = ['Non-cancer', 'Cancer'];

    const classResult = tf.argMax(prediction, 1).dataSync()[0];

    let label;
    let suggestion;

    // Jika hasil prediksi mengandung kelas 'Cancer' (indeks 1)
    if (classResult === 1) {
      label = classes[1];
      suggestion = "Segera periksa ke dokter!";
    } 
    // Jika hasil prediksi tidak mengandung kelas 'Cancer' (indeks 0)
    else {
      label = classes[0];
      suggestion = "Anda sehat!";
    }

    return { confidenceScore, label, suggestion };
  } catch (error) {
    throw new InputError(`Terjadi kesalahan dalam melakukan prediksi`);
  }
}

module.exports = predictClassification;
