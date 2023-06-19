const router = require('express').Router();
const authCtrl = require('../controllers/authCtrl');
const authMiddlware = require('../middlewares/authMiddlware');

router.post('/register', authCtrl.registerUser)
router.post('/login', authCtrl.loginUser)
router.get('/profile',authMiddlware, authCtrl.getProfile)
router.put('/profile',authMiddlware, authCtrl.updateProfile)

module.exports = router;