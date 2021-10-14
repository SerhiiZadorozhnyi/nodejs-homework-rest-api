const express = require('express')
const logger = require('morgan')
const cors = require('cors')
// const mongoose = require('mongoose')
require('dotenv').config()

const authRouter = require('./routes/api/auth')
// const ordersRouter = require('./routes/api/orders')
const contactsRouter = require('./routes/api/contacts')

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())

app.use('/api/contacts', contactsRouter)
app.use('/api/users', authRouter)
// app.use('/api/orders', ordersRouter)

app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Not found'
  })
})

app.use((err, req, res, next) => {
  const { status = 500, message = 'Server error' } = err
  res.status(status).json({ message })
})

module.exports = app
// const { DB_HOST, PORT = 3000 } = process.env

// mongoose.connect(DB_HOST, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
//   .then(() => app.listen(PORT))
//   .catch(error => {
//     console.log(error.message)
//     process.exit(1)
//   })
