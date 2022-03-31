const router = require('express').Router();
const anggotaController = require('../controllers/controller-anggota');
const verifyUser = require('../configs/verify');

router.get('/', verifyUser.isLogin, anggotaController.index);
router.get('/all', verifyUser.isLogin, anggotaController.all);
router.post('/save', verifyUser.isLogin, anggotaController.save);
router.post('/update', verifyUser.isLogin, anggotaController.update);
router.post('/delete', verifyUser.isLogin, anggotaController.delete);

module.exports = router;