const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); // Pastikan path ini sesuai dengan struktur folder Anda

// Endpoint untuk login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Cari pengguna berdasarkan email di basis data
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: true, message: 'User not found' });
    }

    // Bandingkan password yang dimasukkan dengan password yang di-hash dalam basis data
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: true, message: 'Invalid password' });
    }

    // Buat token JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Kirim respons sukses bersama dengan token JWT
    res.json({
      error: false,
      message: 'Login successful',
      loginResult: {
        userId: user._id,
        name: user.name,
        token: token
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
});

module.exports = router;
