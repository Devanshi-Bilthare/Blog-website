var express = require('express');
const { homePage, confirmEmail, confirmEmailPost, resetPassword, resetPasswordPost } = require('../controllers/indexController');
var router = express.Router();

/* GET home page. */
router.get('/',homePage);

router.get('/confirm-email',confirmEmail)

router.post('/confirm-email',confirmEmailPost)

router.get('/reset-password/:id',resetPassword)

router.post('/reset-password/:id',resetPasswordPost)


module.exports = router;
