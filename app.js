const express = require('express');
const paletteRouter = require('./routers/paletteRouter');
const app = express();

app.use('/api/palette', paletteRouter);

module.exports = app;