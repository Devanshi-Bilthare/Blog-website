const User = require('../models/userModel')
const passport = require('passport')
const localStrategy = require('passport-local')
passport.use(new localStrategy(User.authenticate()))

exports.register = (req,res)=>{
    res.render('register')
}

exports.login = (req,res)=>{
    res.render('login')
}

exports.registerPost = async(req,res)=>{
    try{
      const {name,username,email,password} = req.body
      const newuser = new User({name,username,email})
      await User.register(newuser,password)
      res.redirect('/users/login')
    }catch(err){
      res.send(err)
    }
}

exports.loginPost = passport.authenticate('local',{
    successRedirect:`/profile`,
    failureRedirect:'/users/login'
  }),(req,res)=>{}