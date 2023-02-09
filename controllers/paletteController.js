const Palette = require('../models/Palette');
const Color = require('../models/Color');


exports.getAllPalettes = (request, response, next) => {
    Palette
        .find({})
        .then(allPalettes => response.json(allPalettes))
        .catch(error => next(error));
};

exports.createPalette = (request, response, next) => {
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
};

exports.updatePaletteNameOrColorCode = (request, response, next) => {
    const { name, colorCode } = request.body;
    if (!name && !colorCode) {
        return response.status(400).json(
            { error: 'missing name or color code' });
    };
    const newPropsObj = {};
    if (name) newPropsObj.name = name;
    // at this point, if there is a color code included, 
    // I will run the code type conversion on the colors array in the palette.
    if (colorCode) newPropsObj.colorCode = colorCode;
    const id = request.params.id;
    Palette
        .findByIdAndUpdate(id, newPropsObj, {new: true})
        .then(updatedPalette => response.json(updatedPalette))
        .catch(error => next(error));
};

exports.deletePalette = (request, response, next) => {
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
};