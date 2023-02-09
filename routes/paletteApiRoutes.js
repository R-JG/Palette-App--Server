const router = require('express').Router();
const paletteController = require('../controllers/paletteController');


router.get('/', paletteController.getAllPalettes);

router.post('/', paletteController.createPalette);

router.put('/:id', paletteController.updatePaletteNameOrColorCode);

router.delete('/:id', paletteController.deletePalette);


module.exports = router;