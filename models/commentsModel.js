const mongoose = require('mongoose')

const commentsSchema = new mongoose.Schema({
    commentText:{
        type:String
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    createdOn:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'blog'
    },
    userImage:String
})


const comment = mongoose.model('comment',commentsSchema)

module.exports = comment