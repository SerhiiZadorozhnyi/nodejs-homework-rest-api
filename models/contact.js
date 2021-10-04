const { Schema, model } = require('mongoose')
const Joi = require('joi')

const contactSchema = Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'Set email for contact'],
    unique: true,
  },
  phone: {
    type: String,
    required: [true, 'Set phone-number for contact'],
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  versionKey: false,
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function (doc, ret) {
      delete ret._id
      return ret
    }
  },
  toObject: {
    virtuals: true
  }
})

contactSchema.virtual('info').get(function () {

})

const joiSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  phone: Joi.number().positive().required(),
  favorite: Joi.boolean()
})

const joiSchemaStatusContact = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  phone: Joi.number(),
  favorite: Joi.boolean().required()
})

const Contact = model('contact', contactSchema)

module.exports = {
  joiSchema,
  joiSchemaStatusContact,
  Contact
}
