const paletteRouter = require('express').Router();
const Palette = require('../models/Palette');


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
        colorCode: body.colorCode || 'hex',
        colors: []
    });
    newPalette
        .save()
        .then(savedPalette => response.json(savedPalette))
        .catch(error => next(error));
});

paletteRouter.put('/:id', (request, response, next) => {
    const { name, colorCode } = request.body;
    if (!name && !colorCode) {
        return response.status(400).json(
            { error: 'missing name or color code' });
    };
    const newPropsObj = {};
    if (name) newPropsObj.name = name;
    if (colorCode) newPropsObj.colorCode = colorCode;
    const id = request.params.id;
    Palette
        .findByIdAndUpdate(id, newPropsObj, {new: true})
        .then(updatedPalette => response.json(updatedPalette))
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