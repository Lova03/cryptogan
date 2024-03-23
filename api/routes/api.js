const express = require('express');
const api = express.Router();
require('dotenv').config();
const cryptoRouter = require('./crypto.js');

api.use('/crypto', cryptoRouter);

module.exports = api;
