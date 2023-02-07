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

paletteRouter.delete('/:id', (request, response, next) => {
    const id = request.params.id;
    Palette
        .findByIdAndDelete(id)
        .then(deletedPalette => {
            if (deletedPalette) {
                response.status(204).end();
            } else {
                response.status(404).end();
            };
        })
        .catch(error => next(error));
});


module.exports = paletteRouter;