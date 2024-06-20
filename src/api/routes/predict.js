const router = require("express").Router();

// get all predict histories
router.get("/", (req, res) => {
  res.json("Predict");
});

// get spesific predict histories
router.get("/:id", (req, res) => {
  res.json("add ");
});

// make a prediction
router.post("/", (req, res) => {
  res.json(id);
});

module.exports = router;
