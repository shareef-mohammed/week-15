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
        const user = await userData.findOne({
            email: req.body.email,
            password: req.body.password
        })
    
        if(user) {
            const token = jwt.sign({
                email:user.email
            },'secret123')
            return res.json({status:'ok',user:token})
        } else {
            return res.json({status:'error',user:false})
        }
    } catch(err) {
        console.log(err)
    }
}
module.exports = {
    signup,
    login
}
