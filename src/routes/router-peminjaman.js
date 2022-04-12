const router = require('express').Router();
const peminjamanController = require('../controllers/controller-peminjaman');
const verifyUser = require('../configs/verify');

router.get('/', verifyUser.isLogin, peminjamanController.index);
router.get('/all', verifyUser.isLogin, peminjamanController.all);
router.get('/pinjam', verifyUser.isLogin, peminjamanController.pinjam);
router.get('/kembali', verifyUser.isLogin, peminjamanController.kembali);
router.post('/save', verifyUser.isLogin, peminjamanController.save);
router.get('/detail/:id', verifyUser.isLogin, peminjamanController.getById);

module.exports = router;