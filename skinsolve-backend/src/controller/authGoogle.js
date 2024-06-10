const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client();

// Fungsi untuk verifikasi token Google
async function verifyGoogleToken(idToken) {
  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: '944010950351-osufcss1cqucm03mst3tosinumogj1j0.apps.googleusercontent.com'
    });
    const payload = ticket.getPayload();
    const userId = payload['sub'];
    console.log('Verifikasi token Google berhasil:', userId);
    return userId;
  } catch (error) {
    console.error('Error saat verifikasi token Google:', error);
    throw error;
  }
}

module.exports = {
  verifyGoogleToken
};
