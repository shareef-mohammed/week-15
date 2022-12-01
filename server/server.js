require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

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