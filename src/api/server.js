const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
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

  // Welcome API page
  app.get("/", (req, res) => {
    res.json("Welcome to SkinSolve API!");
  });

  app.use("/predict", predictRouter);

  const port = process.env.PORT || 3000;

  /* Error handler middleware */
  app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
  });
  app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
}

module.exports = startServer;
