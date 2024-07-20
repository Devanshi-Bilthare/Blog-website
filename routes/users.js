var express = require('express');
const { register, login, registerPost, loginPost, profile, editProfile, editProfilePost, logout } = require('../controllers/userController');
const { isLoggedIn } = require('../utils/middleware');
var router = express.Router();

/* GET users listing. */
router.get('/');

router.get('/register',register)

router.get('/login',login)

router.post('/register',registerPost)

router.post('/login',loginPost)

router.get('/logout',logout)


router.get('/profile',isLoggedIn,profile)

router.get('/edit-profile/:id',isLoggedIn,editProfile)

router.post('/edit-profile/:id',editProfilePost)


module.exports = router;
