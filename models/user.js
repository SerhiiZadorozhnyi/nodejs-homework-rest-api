const { Schema, model } = require('mongoose')
const { Joi, string } = require('joi')
const bcrypt = require('bcryptjs')
const { modules } = require('../controllers/auth')

const userSchema = Schema({
  email: {
    type: string,
    required: true,
    unique: true
  },
  password: {
    type: string,
    required: true,
    minlength: 6
  }
}, { versionKey: false, timestamps: true })

userSchema.methods.setPassword = function(password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

const joiSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(6).required()
})

const User = model('user', userSchema)

modules.export = {
  joiSchema,
  User
}
