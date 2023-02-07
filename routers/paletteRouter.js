const paletteRouter = require('express').Router();
const Palette = require('../models/palette');

paletteRouter.get('/', (request, response, next) => {
    Palette
        .find({})
        .then(allPalettes => response.json(allPalettes))
        .catch(error => next(error));
});

module.exports = paletteRouter;