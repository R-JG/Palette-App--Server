const mongoose = require('mongoose');
const Color = require('./color');

const paletteSchema = mongoose.Schema({
    name: {
        type: String
    },
    colors: [Color.schema]
});

module.exports = mongoose.model('Palette', paletteSchema);