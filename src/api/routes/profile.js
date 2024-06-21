const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const verifyToken = require('../middleware/authMiddleware');

// Middleware untuk verifikasi token JWT, diterapkan ke semua rute /profile
router.use('/profile', verifyToken);

// Endpoint untuk update profile
router.put('/profile', async (req, res) => {
  const userId = req.user.userId; // Ambil userId dari token JWT (diasumsikan sudah diverifikasi dan disimpan di req.user)

  // Dapatkan data yang ingin diperbarui dari body request
  const { name, email, skintype } = req.body;

  try {
    // Cari pengguna berdasarkan userId di basis data
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: true, message: 'User not found' });
    }

    // Update data profil sesuai dengan yang diberikan
    if (name) user.name = name;
    if (email) user.email = email;
    if (skintype) user.skintype = skintype;

    // Simpan perubahan ke basis data
    await user.save();

    // Kirim respons sukses
    res.json({ error: false, message: 'Profile updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
});

module.exports = router;
