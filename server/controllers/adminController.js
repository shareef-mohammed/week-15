const adminData  = require('../models/adminModel')
const userData = require('../models/userModel')

const login = async(req,res) => {
    try {
        const admin = await adminData.find({})
        if(admin.length == 0) {
            await adminData.create({
                name:'shareef',
                password:'12345'
            })
            
        }

        const adm = await adminData.findOne({
            name: req.body.name
            
        })
        if(!req.body.name || !req.body.password) {
            res.json({status:'blank'})
        } else if(adm) {
            res.json({status:'ok'})

        } else {
            res.json({status:'error'})
        }
    } catch(err) {
        console.log(err)
    }
}

const getDashboard = async(req,res) => {
    try {
        const users = await userData.find({})
        res.json({users})

    } catch(err) {
        console.log(err)
    }
}

const singleUser = async(req,res) => {
    try{
        const {id} = req.params
        const user = await userData.findById(id)
        res.json({user})
    } catch(err) {
        console.log(err)
    }
}

const editUser = async(req,res) => {
    try{
        const {id} = req.params
        const user = await userData.findById(id)
        res.json({user})
    } catch(err) {
        console.log(err)
    }
}

const updateUser = async(req,res) => {
    try {
        const {id} = req.params
        const update = await userData.findByIdAndUpdate(id,{...req.body})
        res.json({update})
    } catch(err) {
        console.log(err)
    }
}

const removeUser = async(req,res) => {
    try {
        const {id} = req.params
        
        await userData.findByIdAndDelete(id)
        
        res.json({status:true})
    }catch(err) {
        console.log(err)
    }
}


module.exports = {
    login,
    getDashboard,
    singleUser,
    editUser,
    updateUser,
    removeUser
}