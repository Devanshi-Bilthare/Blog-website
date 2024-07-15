var express = require('express');
const { homePage, profile } = require('../controllers/indexController');
const { isLoggedIn } = require('../utils/middleware');
var router = express.Router();

/* GET home page. */
router.get('/',homePage);

router.get('/profile',isLoggedIn,profile)

module.exports = router;
