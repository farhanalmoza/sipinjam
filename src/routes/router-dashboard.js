const router = require('express').Router();
const dashboardController = require('../controllers/controller-dashboard');
const verifyUser = require('../configs/verify');

router.get('/', verifyUser.isLogin, dashboardController.index);

module.exports = router;