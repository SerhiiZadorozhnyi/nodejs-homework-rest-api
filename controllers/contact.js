const { NotFound } = require('http-errors')

const { sendSuccessRes } = require('../helpers')
const { Contact } = require('../models')

const getAll = async (req, res) => {
  const result = await Contact.find({}, 'name favorite phone email')
  sendSuccessRes(res, { result })
}

const getContactById = async (req, res) => {
  const { contactId } = req.params
  const result = await Contact.findById(contactId, 'name favorite phone email')
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} Not Found`)
  }
  sendSuccessRes(res, result)
}

const addContact = async (req, res) => {
  const result = await Contact.create(req.body)
  sendSuccessRes(res, result, 201)
}

const updateContactById = async (req, res) => {
  const { contactId } = req.params
  const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true })
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`)
  }
  sendSuccessRes(res, { result })
}

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params
  const { favorite } = req.body
  const result = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true })
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`)
  }
  sendSuccessRes(res, { result })
}

const removeContactById = async (req, res) => {
  const { contactId } = req.params
  const result = await Contact.findByIdAndDelete(contactId)
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} Not Found`)
  }
  sendSuccessRes(res, { message: 'Contact deleted' })
}

module.exports = {
  getAll,
  getContactById,
  addContact,
  updateContactById,
  updateStatusContact,
  removeContactById
}
