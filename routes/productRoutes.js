const router = require('express').Router();

router.get('/', getAllProducts)
router.get('/:id', getSpecificProduct)
router.post('/', createNewProduct)
router.put('/:id', UpdateProduct)
router.delete('/:id', deleteProduct)

module.exports = router;