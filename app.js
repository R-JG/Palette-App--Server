const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { MONGO_URI } = require('./utils/config');
const { infoLog, errorLog } = require('./utils/logger');
const middleware = require('./utils/middleware');
const paletteRouter = require('./routers/paletteRouter');
const app = express();


infoLog('connecting to MongoDB...');
mongoose.set('strictQuery', false);
mongoose.connect(MONGO_URI)
    .then(() => infoLog('succesfully connected to MongoDB'))  
    .catch(error => 
        errorLog('error connecting to MongoDB: ', error.message)
);


app.use(cors());
app.use(middleware.requestLogger);
app.use(express.json());

app.use('/api/palette', paletteRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;