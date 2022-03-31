const router = require('express').Router();
const pengembalianController = require('../controllers/controller-pengembalian');
const verifyUser = require('../configs/verify');

router.get('/', verifyUser.isLogin, pengembalianController.index);

module.exports = router;