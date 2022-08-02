const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userRoutes = require('./routes/user')
const authRoutes = require('./routes/auth')
const productRoutes = require('./routes/product')

dotenv.config()

app.use(express.json())


mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('DB Connected Successfully')
}).catch((err)=>{
    console.log(err)
})

app.use('/api/users',userRoutes)
app.use('/api/auth',authRoutes)
app.use('/api/products',productRoutes)

app.listen(process.env.API_PORT || 5000,()=>{
    console.log('Backend Server is Running....')
})