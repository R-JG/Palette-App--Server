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
    const id = request.params.paletteId;
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
    Palette
        .findByIdAndUpdate(id, newPropsObj, {new: true})
        .then(updatedPalette => response.json(updatedPalette))
        .catch(error => next(error));
};

exports.deletePalette = (request, response, next) => {
    const id = request.params.paletteId;
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

exports.addColorToPalette = (request, response, next) => {
    const paletteId = request.params.paletteId;
    const colorData = request.body.color;
    if (!colorData || (typeof colorData !== 'string')) {
        return response.status(400).json({ 
            error: 'missing or malformatted color property' 
        });
    };
    Palette
        .findById(paletteId)
        .then(palette => {
            if (!palette) return response.status(404).end();
            const newColor = new Color({
                code: colorData, 
                // Hardcoded type:
                codeType: 'hex'
            });
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
    if (!colorId) return response.status(400).json({ 
        error: 'missing color id' 
    });
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