const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });

const url = {
  acne: process.env.MODEL_URL_ACNE,
  redness: process.env.MODEL_URL_REDNESS,
  skintype: process.env.MODEL_URL_SKINTYPE,
};

module.exports = { url };
