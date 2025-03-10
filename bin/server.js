const mongoose = require('mongoose')
require('dotenv').config()

const app = require('../app')

const { DB_HOST, PORT = 3000 } = process.env

mongoose.connect(DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running. Use API on port: ${PORT}`)
    })
  })
  .catch(error => {
    console.log(error.message)
    process.exit(1)
  })
