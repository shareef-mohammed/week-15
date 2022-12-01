const express = require('express')
const router = express()

const {
    login,
    getDashboard,
    singleUser,
    editUser,
    updateUser,
    removeUser
} = require('../controllers/adminController')

router.post('/dashboard', login)
router.get('/dashboard', getDashboard)
router.get('/view/:id', singleUser)
router.get('/edit/:id',editUser)
router.post('/update/:id', updateUser)
router.delete('/remove/:id' ,removeUser)

module.exports = router