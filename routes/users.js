var express = require('express');
const { register, login, registerPost, loginPost } = require('../controllers/userController');
var router = express.Router();

/* GET users listing. */
router.get('/');

router.get('/register',register)

router.get('/login',login)

router.post('/register',registerPost)

router.post('/login',loginPost)


module.exports = router;
