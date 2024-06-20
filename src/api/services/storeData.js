const { Firestore } = require("@google-cloud/firestore");

async function storeData(id, data) {
  const db = new Firestore();

  const predictCollection = db.collection("predictions");
  return predictCollection.doc(id).set(data);
}

async function storeGetById(id) {
  const db = new Firestore();
  const predictCollection = db.collection("predictions");

  const doc = await predictCollection.doc(id).get();

  if (!doc.exists) {
    return null; // Return null if document with the given ID does not exist
  }

  return doc.data(); // Return the data of the document
}

async function storeGetAll() {
  const db = new Firestore();

  const predictCollection = db.collection("predictions");
  const snapshot = await predictCollection.get();
  const histories = [];
  snapshot.forEach((doc) => {
    histories.push(doc.data());
  });
  return histories;
}
const {
  getPredictionById: storeGetById,
  storeData,
  storeGetAll,
} = require("./storeData");

module.exports = {
  storeData,
  storeGetById,
  storeGetAll,
};
