const express = require('express')
const router = express()
const multer = require('multer')
const cloudinary = require('../utils/cloudinary')
const { storage } = require('../utils/cloudinary')
const upload = multer({ storage })
 
const {
    signup,
    login,
    userDetails,
    uploadImg
} = require('../controllers/userConroller')

router.post('/api/register', signup)
router.post('/api/login',login)
router.get('/api/userDetails/:id',userDetails)
router.post('/api/uploadImg/:id', upload.array('image'), uploadImg)


module.exports = router