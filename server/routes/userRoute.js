const express = require('express')
const router = express()
const multer = require('multer')

 
const {
    signup,
    login,
    userDetails,
    uploadImg
} = require('../controllers/userConroller')

const auth = require('../middleware/auth')

router.post('/api/register', signup)
router.post('/api/login',login)
router.get('/api/userDetails/:id',auth.authCheck ,userDetails)
router.post('/api/uploadImg/:id', uploadImg)


module.exports = router