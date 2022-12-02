const jwt = require('jsonwebtoken')
const userData = require('../models/userModel')

const {
    hashPassword,
    comparePassword
} = require('../utils/helpers')


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
            const {name,email,password} = req.body
            const hashedPassword = hashPassword(password)
            
            await userData.create({
                name,
                email,
                password: hashedPassword
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
        
        const user = await userData.findOne({
            email: req.body.email,
           
        })
        
        if(user) {
            const password = req.body.password
            const isValid = comparePassword(password,user.password)
           if(isValid){
            const token = jwt.sign({
                id:user._id,
                name: user.name,
                type:'user'
            },'secret123')
            
                res.json({status:true,user:token})
           }else {
                res.json({status:false,user:false})
           }
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
       
        const {id} = req.params
        const {url} = req.body
        
        const profile = await userData.findByIdAndUpdate(id,{image:url})
        await profile.save()
        res.json({profile})
       
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
