const router = require('express').Router();
const kategoriController = require('../controllers/controller-kategori');
const verifyUser = require('../configs/verify');

router.get('/all', verifyUser.isLogin, kategoriController.all);
router.post('/save', verifyUser.isLogin, kategoriController.save);
router.post('/delete', verifyUser.isLogin, kategoriController.delete);

module.exports = router;