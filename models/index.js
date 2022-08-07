const mongoose = require('mongoose');
const Product = require('./product');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

module.exports = { Product };