const router = require('express').Router();

router.get('/', getAllOrders)
router.get('/:id', getOrder)
router.post('/', createOrder)
router.update('/:id', updateOrder)
router.delete('/', deleteOrder)

module.exports = router;