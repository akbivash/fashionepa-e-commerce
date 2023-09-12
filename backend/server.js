const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const userRoute = require('./routes/user')
// const bodyParser = require('body-parser')
const authRoute = require('./routes/auth')
const productRoute = require('./routes/product')
const cartRoute = require('./routes/cart')
const stripeRoute = require('./routes/stripe')
require('dotenv').config()
const app = express()
var corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials:true,
}
app.use(cors(corsOptions))
// parse requests of content-type - application/json
app.use(express.json())
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended:true}))



app.get('/', (req,res) => {
  res.json({msg:"Welcome to fashionepa backend"})
})
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/users', userRoute)
app.use('/api/v1/products', productRoute)
app.use('/api/v1/cart',cartRoute)
app.use('/api/v1/checkout', stripeRoute)
app.use('/*' , (req, res) => res.send('Please try a good endpoint'))

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
} ).then(() => console.log('db connected')).catch(err => console.log(err))

const port = process.env.PORT || 5000
app.listen(port, () =>  console.log(`server is listening to the port ${port}`))