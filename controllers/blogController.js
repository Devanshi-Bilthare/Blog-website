const imageKit = require('../utils/imageKit')
const Blog = require('../models/blogModel')
const Comments = require('../models/commentsModel')

exports.allBlogs = async (req,res)=>{
    try{
        const allBlogs = await Blog.find()
        res.render('allBlogs',{allBlogs})
    }catch(err){
        res.send(err)
    }
}

exports.createBlog = (req,res)=>{
    res.render('create')
}

exports.blogDetail = async (req,res) => {
    try{
        const {id} = req.params
        const blog =await Blog.findById(id).populate('comments')
        res.render('blogDetail',{blog})
    }catch(err){
        res.send(err)
    }
}

exports.createBlogPost =async (req,res)=>{
    try{
        const {title,description,details} = req.body
        const blogData =await new Blog({title,description,details,createdBy:req.user._id})
        if(req.files){
            const{url,fileId} = await imageKit.upload({
                file:req.files.blogImage.data,
                fileName:req.files.blogImage.name
            })
            blogData.blogImage = url
        }
        req.user.blogs.push(blogData._id)
        blogData.save()
        req.user.save()
        res.redirect('/users/profile')

    }catch(err){
        res.send(err)
    }
}

exports.comments = async (req,res)=>{
    try{
        const {id} = req.params
        const blog = await Blog.findById(id)
        const {commentText} = req.body
        const newComment = await new Comments({
            commentText,
            createdBy:req.user,
            createdOn:id,
            userImage:req.user.profilepic
        })

        req.user.comments.push(newComment._id)
        blog.comments.push(newComment._id)
        newComment.save()
        req.user.save()
        blog.save()
        res.redirect(`/blogs/blogDetail/${id}`)

    }catch(err){
        res.send(err)
    }
}