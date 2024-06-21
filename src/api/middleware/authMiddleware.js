const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const dotenv = require('dotenv');
dotenv.config();

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  if (!token) return res.status(401).json({ error: true, message: 'Access denied. Token is required.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).json({ error: true, message: 'User not found' });

    // Tambahkan user ke dalam req.user untuk digunakan di controller
    req.user = { userId: user._id };
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: true, message: 'Invalid token' });
  }
};

module.exports = verifyToken;
