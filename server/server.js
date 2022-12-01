require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

const userRoute = require('./routes/userRoute')
const adminRoute = require('./routes/adminRouter')
const mongoose = require('mongoose')

app.use('/' ,userRoute)
app.use('/admin', adminRoute)

mongoose.connect(process.env.MONG_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Listening !!!") 
        })
    }).catch((err) => {
        console.log(err)
    })