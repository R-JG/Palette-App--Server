const router = require('express').Router();
const paletteController = require('../controllers/paletteController');


router.get('/', paletteController.getAllPalettes);

router.post('/', paletteController.createPalette);

router.put('/:paletteId', paletteController.updatePaletteNameOrColorCode);

router.delete('/:paletteId', paletteController.deletePalette);

router.post('/:paletteId/colors', paletteController.addColorToPalette);

router.delete('/:paletteId/colors/:colorId', paletteController.deleteColorFromPalette);


module.exports = router;