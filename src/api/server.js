const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const app = express();


async function startServer() {
// Use json request and cors handler
app.use(bodyParser.json());
app.use(cors());
// Use morgan dev logging
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

}

module.exports = startServer;
