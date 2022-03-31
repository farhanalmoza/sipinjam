const router = require('express').Router();
const peminjamanController = require('../controllers/controller-peminjaman');
const verifyUser = require('../configs/verify');

router.get('/', verifyUser.isLogin, peminjamanController.index);
router.get('/all', verifyUser.isLogin, peminjamanController.all);
router.post('/save', verifyUser.isLogin, peminjamanController.save);
router.post('/update', verifyUser.isLogin, peminjamanController.update);
router.post('/delete', verifyUser.isLogin, peminjamanController.delete);

module.exports = router;