const { infoLog, errorLog } = require('./logger');

const requestLogger = (request, response, next) => {
    infoLog('------- Request -------');
    infoLog('Method: ', request.method);
    infoLog('Path: ', request.path);
    infoLog('Body: ', request.body);
    infoLog('-----------------------');
    next();
};

const unknownEndpoint = (request, response) => {
    response.status(404).json({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
    errorLog(error.message);
    next(error);
};

module.exports = { requestLogger, unknownEndpoint, errorHandler };