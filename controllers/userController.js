const User = require('../models/userModel')
const Blog = require('../models/blogModel')
const imagekit = require('../utils/imageKit')
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
    successRedirect:`/users/profile`,
    failureRedirect:'/users/login'
  }),(req,res)=>{}

exports.logout = (req,res)=>{
  req.logout(()=>{
    res.redirect('/users/login')
  })
}


exports.profile =async (req,res)=>{
  try{
    const user = await req.user.populate('blogs')
    res.render('profile',{user})
  }catch(err){
    res.send(err)
  }
}

exports.editProfile = (req,res)=>{
  res.render('edit-profile',{user:req.user})
}

exports.editProfilePost = async (req,res)=>{
  try{
      const {name,username,email,bio}= req.body
      const updatedData = {
        name,
        username,
        email,
        bio,
      }
  
      if(req.files){
        if(req.files.profilepic){
          const profilepicData = await imagekit.upload({
            file:req.files.profilepic.data,
            fileName:req.files.profilepic.name
          })
  
          updatedData.profilepic = profilepicData.url
        }
  
        if(req.files.backgroundImage){
          const backgroundImageData = await imagekit.upload({
            file:req.files.backgroundImage.data,
            fileName:req.files.backgroundImage.name
          })
           updatedData.backgroundImage = backgroundImageData.url
          }
      }


        const user = await User.findByIdAndUpdate(req.params.id,updatedData)
        await user.save()

      res.redirect('/users/profile')
  }catch(err){
      res.send(err)
  }
}