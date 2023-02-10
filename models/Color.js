const mongoose = require('mongoose');

const colorSchema = mongoose.Schema({
    r: {
        type: Number,
        min: 0,
        max: 255,
        required: true
    },
    g: {
        type: Number,
        min: 0,
        max: 255,
        required: true
    },
    b: {
        type: Number,
        min: 0,
        max: 255,
        required: true
    }
});

module.exports = mongoose.model('Color', colorSchema);