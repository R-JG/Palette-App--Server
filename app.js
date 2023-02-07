const express = require('express');
const cors = require('cors');
const middleware = require('./utils/middleware');
const paletteRouter = require('./routers/paletteRouter');
const app = express();

app.use(cors());
app.use(middleware.requestLogger);

app.use('/api/palette', paletteRouter);

app.use(middleware.unknownEndpoint);

module.exports = app;