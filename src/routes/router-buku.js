const router = require('express').Router();
const bukuController = require('../controllers/controller-buku');
const verifyUser = require('../configs/verify');

router.get('/', verifyUser.isLogin, bukuController.index);
router.get('/all', verifyUser.isLogin, bukuController.all);
router.post('/save', verifyUser.isLogin, bukuController.save);
router.post('/delete', verifyUser.isLogin, bukuController.delete);
router.post('/update', verifyUser.isLogin, bukuController.update);

module.exports = router;