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
        colors: []
    });
    newPalette
        .save()
        .then(savedPalette => response.json(savedPalette))
        .catch(error => next(error));
};

exports.updatePaletteName = (request, response, next) => {
    const paletteId = request.params.paletteId;
    const name = request.body.name;
    if (!name) {
        return response.status(400).json(
            { error: 'missing name property' });
    };
    const newPropsObj = { name };
    Palette
        .findByIdAndUpdate(paletteId, newPropsObj, {new: true})
        .then(updatedPalette => response.json(updatedPalette))
        .catch(error => next(error));
};

exports.deletePalette = (request, response, next) => {
    const paletteId = request.params.paletteId;
    Palette
        .findByIdAndDelete(paletteId)
        .then(deletedPalette => {
            if (deletedPalette) {
                response.status(204).end();
            } else {
                response.status(404).end();
            };
        })
        .catch(error => next(error));
};

exports.addColorToPalette = (request, response, next) => {
    const paletteId = request.params.paletteId;
    const rgbColor = request.body.rgbColor;
    if (!rgbColor.r || !rgbColor.g || !rgbColor.b) {
        return response.status(400).json({ 
            error: 'missing or malformatted rgb color property' 
        });
    };
    Palette
        .findById(paletteId)
        .then(palette => {
            if (!palette) return response.status(404).end();
            const { r, g, b } = rgbColor;
            const newColor = new Color({ r, g, b });
            palette.colors = palette.colors.concat(newColor);
            palette
                .save()
                .then(updatedPalette => response.json(updatedPalette))
                .catch(error => next(error));
        });
};

exports.deleteColorFromPalette = (request, response, next) => {
    const paletteId = request.params.paletteId;
    const colorId = request.params.colorId;
    Palette
        .findById(paletteId)
        .then(palette => {
            if (!palette) return response.status(404).end();
            const updatedColors = palette.colors.filter(color => 
                color._id.toString() !== colorId
            );
            if (updatedColors.length === palette.colors.length) {
                return response.status(404).json({ 
                    error: 'color id does not match any color in this palette' 
                });
            };
            palette.colors = updatedColors;
            palette
                .save()
                .then(updatedPalette => response.json(updatedPalette))
                .catch(error => next(error));
        });
};