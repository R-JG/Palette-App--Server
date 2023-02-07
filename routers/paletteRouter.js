const paletteRouter = require('express').Router();

paletteRouter.get('/', (request, response) => {
    response.send('<h1>TEST</h1>');
});

module.exports = paletteRouter;