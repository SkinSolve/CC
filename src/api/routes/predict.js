const router = require("express").Router();
const multer = require("multer");
const {
  getPredictionById,
  postPredictHandler,
  getPredictHistories,
} = require("../services/handler");

// get all predict histories
router.get("/", getPredictHistories);

// get spesific predict histories
router.get("/:id", getPredictionById);

// Set up multer for file upload handling
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

// make a prediction
router.post("/", upload.single("image"), postPredictHandler);

module.exports = router;
