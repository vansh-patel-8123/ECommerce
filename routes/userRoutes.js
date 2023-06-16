const router = require('express').Router();
const authCtrl = require('../controllers/authCtrl');

router.post('/register', authCtrl.registerUser)
router.post('/login', authCtrl.loginUser)
// router.get('/profile', getProfile)
// router.put('/profile', updateProfile)

module.exports = router;