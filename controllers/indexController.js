const sendMail = require('../utils/mail')
const User = require('../models/userModel')
exports.homePage = (req, res, next)=> {
    res.render('index');
}


exports.confirmEmail = (req,res)=>{
  res.render('confirm-email')
}

exports.confirmEmailPost = async (req,res)=>{
  try{
    const {email} = req.body
    const user = await User.findOne({email:email})
    if(user){
      sendMail(res,user)
    }else{
      res.redirect('/users/login')
    }
    
  }catch(err){
    res.send(err)
  }
}

exports.resetPassword = (req,res)=>{
  const {id} = req.params
  res.render('reset-password',{id})
}

exports.resetPasswordPost =async (req,res)=>{
  try{
    const {id} = req.params
    const user = await User.findById(id)
    await user.setPassword(req.body.password)
    user.save()
    res.redirect('/users/login')
  }catch(err){
    res.send(err)
  }
  
}