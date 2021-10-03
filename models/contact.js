const { Schema, model } = require('mongoose')
const Joi = require('joi')

const contactSchema = Schema({
  name: {
    type: String,
    require: [true, 'Set name for contact'],
    unique: true,
  },
  email: {
    type: String,
    require: [true, 'Set email for contact'],
    unique: true,
  },
  phone: {
    type: String,
    require: [true, 'Set phone-number for contact'],
  },
  favorite: {
    type: Boolean,
    default: false,
  },
})

const joiSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', ['net']] } }).required(),
  phone: Joi.number().required(),
  favorite: Joi.boolean()
})

const joiSchemaStatusContact = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', ['net']] } }).required(),
  phone: Joi.number(),
  favorite: Joi.boolean().required()
})

const Contact = model('contact', contactSchema)

module.exports = {
  joiSchema,
  joiSchemaStatusContact,
  Contact
}
