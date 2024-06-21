const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Endpoint untuk register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Validasi panjang password
    if (password.length < 8) {
      return res.status(400).json({ error: true, message: 'Password must be at least 8 characters long' });
    }

    // Enkripsi password sebelum disimpan
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat pengguna baru
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.json({ error: false, message: 'User Created' });
  } catch (err) {
    if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
      // Jika email sudah ada di database (duplikat)
      return res.status(409).json({ error: true, message: 'Email already exists' });
    }
    console.error(err);
    res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
});

module.exports = router;
