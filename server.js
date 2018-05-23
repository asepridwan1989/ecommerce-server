const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const userdb = process.env.USERDB
const passdb = process.env.PASSDB
// const index = require('./routes/index')
const user = require('./routes/user')
const upload = require('./routes/upload')
mongoose.connect(`mongodb://${userdb}:${passdb}@ds129560.mlab.com:29560/ecommerce`, (err) => {
  if(err) {
    console.log(`failed to connect database`)
  } else {
    console.log(`successfuly connected to database`)
  }
});


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended:false }))
app.use(morgan('dev'))

const db = mongoose.connection
db.on('error',console.error.bind(console,'connection to db error:'))
db.once('open', function(){
    console.log('connected to db')
})

// app.use('/', index)
app.use('/users', user)
app.use('/upload', upload)

const port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log(`listening on port : ${port}`)
})
