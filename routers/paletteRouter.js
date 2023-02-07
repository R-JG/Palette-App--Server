const paletteRouter = require('express').Router();
const Palette = require('../models/palette');


paletteRouter.get('/', (request, response, next) => {
    Palette
        .find({})
        .then(allPalettes => response.json(allPalettes))
        .catch(error => next(error));
});

paletteRouter.post('/', (request, response, next) => {
    const body = request.body;
    const newPalette = new Palette({
        name: body.name || 'New Palette',
        colors: []
    });
    newPalette
        .save()
        .then(savedPalette => response.json(savedPalette))
        .catch(error => next(error));
});


module.exports = paletteRouter;