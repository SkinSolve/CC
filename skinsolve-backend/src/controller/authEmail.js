const admin = require('firebase-admin');
const serviceAccount = require('./CC/skinsolve-backend/serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// Fungsi untuk membuat pengguna dengan email dan kata sandi
async function createEmailUser(email, password) {
  try {
    const userRecord = await admin.auth().createUser({
      email,
      password
    });
    console.log('Pengguna berhasil dibuat:', userRecord.uid);
    return userRecord.uid;
  } catch (error) {
    console.error('Error saat membuat pengguna:', error);
    throw error;
  }
}

// Fungsi untuk login dengan email dan kata sandi
async function signInWithEmail(email, password) {
  try {
    const userRecord = await admin.auth().getUserByEmail(email);
    console.log('Pengguna berhasil ditemukan:', userRecord.uid);
    return userRecord.uid;
  } catch (error) {
    console.error('Error saat mencari pengguna:', error);
    throw error;
  }
}

module.exports = {
  createEmailUser,
  signInWithEmail
};
