const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Skema untuk pengguna (user)
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  skintype: { type: String, default: 'normal' } // Contoh properti tambahan
  // Tambahan properti lain sesuai kebutuhan aplikasi Anda
});

// Membuat model User berdasarkan skema yang telah didefinisikan
const User = mongoose.model('User', userSchema);

module.exports = User;