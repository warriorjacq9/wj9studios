const mongoose = require('mongoose');

const prodSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    file: { buffer: Buffer, mimetype: String, encoding: String },
    date: { type: Date, default: Date.now() }
});

module.exports = mongoose.model('Product', prodSchema);