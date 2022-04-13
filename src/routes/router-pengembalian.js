const router = require('express').Router();
const pengembalianController = require('../controllers/controller-pengembalian');
const verifyUser = require('../configs/verify');

router.get('/', verifyUser.isLogin, pengembalianController.index);
router.post('/save', verifyUser.isLogin, pengembalianController.save);
router.get('/all', verifyUser.isLogin, pengembalianController.all);

module.exports = router;