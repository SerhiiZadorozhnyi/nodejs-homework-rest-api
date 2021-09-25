const express = require('express')
const router = express.Router()
const Joi = require('joi')

const addContactValidate = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2 }).required(),
  phone: Joi.string().required()
})

const updateContactValidate = Joi.object({
  name: Joi.string(),
  rmsil: Joi.string().email({ minDomainSegments: 2 }),
  phone: Joi.string()
})

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact
} = require('../../model/index')

router.get('/', async (req, res, next) => {
  const contacts = await listContacts()
  res.json({
    status: 'success',
    code: 200,
    data: {
      contacts
    }
  })
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params
    const contact = await getContactById(contactId)
    if (!contact) {
      res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Not found'
      })
    } else {
      res.status(200).json({
        status: 'success',
        code: 200,
        data: {
          result: contact
        }
      })
    }
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  const newContact = req.body
  const { error } = addContactValidate.validate(newContact)
  if (error) {
    res.status(400).json({
      status: 'error',
      code: 400,
      message: error.message
    })
    return
  }
  const response = await addContact(newContact)
  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      result: response
    }
  })
})

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  const response = await removeContact(contactId)
  response
    ? res.status(200).json({
      status: 'success',
      code: 200,
      message: `Contact id=${contactId} deleted`,
    })
    : res.status(404).json({
      status: 'error',
      code: 404,
      message: 'Not found',
    })
})

router.patch('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  const body = req.body
  const { error } = updateContactValidate.validate(body)
  if (error) {
    res.status(400).json({
      status: 'error',
      code: 400,
      message: error.message
    })
  }
  const response = await updateContact(contactId, body)
  res.status(200).json({
    status: 'success',
    code: 200,
    data: {
      result: response
    }
  })
})

module.exports = router
