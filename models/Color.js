const mongoose = require('mongoose');

const colorSchema = mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    codeType: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Color', colorSchema);