const { NotFound } = require('http-errors')

const { sendSuccessRes } = require('../helpers')
const { Contact } = require('../models')

const getAll = async (req, res) => {
  const data = await Contact.find({}, 'name favorite phone email')
  sendSuccessRes(res, { data })
}

const getContactById = async (req, res) => {
  const { contactId } = req.params
  const data = await Contact.findById(contactId, 'name favorite phone email')
  if (!data) {
    throw new NotFound(`Contact with id=${contactId} Not Found`)
  }
  sendSuccessRes(res, data)
}

const addContact = async (req, res) => {
  const data = await Contact.create(req.body)
  sendSuccessRes(res, data, 201)
}

const updateContactById = async (req, res) => {
  const { contactId } = req.params
  const data = await Contact.findByIdAndUpdate(contactId, req.body, { new: true })
  if (!data) {
    throw new NotFound(`Contact with id=${contactId} not found`)
  }
  sendSuccessRes(res, { data })
}

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params
  const { favorite } = req.body
  const data = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true })
  if (!data) {
    throw new NotFound(`Contact with id=${contactId} not found`)
  }
  sendSuccessRes(res, { data })
}

const removeContactById = async (req, res) => {
  const { contactId } = req.params
  const data = await Contact.findByIdAndDelete(contactId)
  if (!data) {
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
