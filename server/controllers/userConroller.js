const jwt = require('jsonwebtoken')
const userData = require('../models/userModel')


const signup = async(req,res) => {
    try {
        const user = await userData.findOne({
            email: req.body.email
            
        })
        if(!req.body.name || !req.body.email || !req.body.password || !req.body.password2){
            res.json({status:'blank'})
        }else if(req.body.password != req.body.password2){
            res.json({status:'matchErr'})
        }
        else if(!user){
            await userData.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
            res.json({status:'ok'})
        } else {
            res.json({status:'error'})
        }
        
         
    } catch(err) {
        console.log(err)
    }
}

const login = async(req,res) => {
    try {
        console.log('hello') 
        const user = await userData.findOne({
            email: req.body.email,
            password: req.body.password
        })
    
        if(user) {
            const token = jwt.sign({
                id:user._id,
                name: user.name
            },'secret123')
            console.log(token)
            res.json({status:true,user:token})
        } else {
            res.json({status:false,user:false})
        }
    } catch(err) {
        console.log(err)
    }
}
const userDetails = async(req,res) => {
    try {
        const {id} = req.params
        
        const decoded = jwt.verify(id,'secret123')
        const userId = decoded.id;
        const details = await userData.findById({_id:userId})
        res.json({details})
    } catch(err) {
        console.log(err)
    }
}

const uploadImg = async(req,res) => {
    try {
        console.log('hai')
        const {id} = req.params
        console.log(req.body.file)
        const profile = await userData.findById(id)
        console.log(req.files)
        const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }))
        profile.image.unshift(...imgs)
        await product.save()
        console.log(profile)
        res.json({image:profile.image})
    } catch(err) {
        console.log(err)
    }
}

module.exports = {
    signup,
    login,
    userDetails,
    uploadImg
}
