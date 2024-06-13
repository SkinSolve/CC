const { Firestore } = require('@google-cloud/firestore');

async function storeData(id, data) {
  const db = new Firestore({
    databaseId: '(default)'
  });

  const predictCollection = db.collection('predictions');
  return predictCollection.doc(id).set(data);
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

module.exports = {
  storeData,
  storeGetAll,
};