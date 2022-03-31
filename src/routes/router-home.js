const router = require('express').Router();
const homeController = require('../controllers/controller-home');

router.get('/', homeController.index);

module.exports = router;