const router = require('express').Router();
const petugasController = require('../controllers/controller-petugas');
const verifyUser = require('../configs/verify');

router.get('/', verifyUser.isLogin, petugasController.index);
router.get('/profile', petugasController.profile);

module.exports = router;