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

module.exports = { requestLogger, unknownEndpoint };