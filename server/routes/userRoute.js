const express = require('express')
const router = express()

const {
    signup,
    login
} = require('../controllers/userConroller')

router.post('/api/register', signup)
router.post('/api/login',login)


module.exports = router