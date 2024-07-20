const mail = require('nodemailer')

const sendMail = (res,user)=>{
    const url = `http://localhost:3000/reset-password/${user._id}`

    const transport = mail.createTransport({
        service:'gmail',
        host:'smtp.gmail.com',
        port:465,
        auth:{
            user: "devanshibilthare@gmail.com",
            pass: "aknqibzvlmsdypmf",
        }
    })

    const mailOptions = {
        from:'blogsquare space blog <squarespace@gmail.com>',
        to:user.email,
        subject:"password reset link",
        text:'do not share this link with anyone',
        html:`<a href=${url}>Password reset</a>`
    }

    transport.sendMail(mailOptions,async(err,info)=>{
        res.send(`<h1 class="text-5xl text-center mt-20">Check Your Inbox / Spam</h1>`)
    })

}

module.exports = sendMail