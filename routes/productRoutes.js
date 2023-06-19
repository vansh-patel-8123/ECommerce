const authMiddlware = require('../middlewares/authMiddlware');
const router = require('express').Router();
const productCtrl = require('../controllers/productCtrl');

router.get('/',authMiddlware, productCtrl.getAllProducts)
router.get('/:id',authMiddlware, productCtrl.getSpecificProduct)
router.post('/',authMiddlware, productCtrl.createNewProduct)
router.put('/:id',authMiddlware, productCtrl.UpdateProduct)
router.delete('/:id',authMiddlware, productCtrl.deleteProduct)

module.exports = router;