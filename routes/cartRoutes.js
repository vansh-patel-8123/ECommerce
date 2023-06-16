const router = require('express').Router();

router.get('/', getCart)
router.post('/', addProductCart)
router.put('/:id', updateProductCart)
router.delete('/:id', deleteProductCart)

module.exports = router;