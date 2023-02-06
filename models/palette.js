const mongoose = require('mongoose');

const paletteSchema = mongoose.Schema({});

module.exports = mongoose.model('Palette', paletteSchema);