const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

module.exports = app;

const PORT = process.env.PORT || 4001;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const apiRouter = require('./routes/api');
app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
