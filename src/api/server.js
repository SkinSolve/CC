require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require('mongoose');
const profileRouter = require('./routes/profile');
const predictRouter = require("./routes/predict");

async function startServer() {
  const app = express();

  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );

  // Use cors handler
  app.use(cors());

  // Use morgan dev logging
  app.use(morgan("dev"));

  // Setup MongoDB connection
  mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

  // Welcome API page
  app.get("/", (req, res) => {
    res.json("Welcome to SkinSolve API!");
  });

  app.use('/profile', profileRouter);
  app.use("/predict", predictRouter);

  const port = process.env.PORT || 3000;

  // Error handling middleware for multer file size limit
  app.use((err, req, res, next) => {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(413).json({
        status: "error",
        message: "File size exceeds the 5 MB limit",
      });
    }
    next(err);
  });

  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
}

module.exports = startServer;
