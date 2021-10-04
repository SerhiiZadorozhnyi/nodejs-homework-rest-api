const { NotFound } = require('http-errors')
const { Contact } = require('../models')
const { sendSuccessRes } = require('../helpers')

const listContacts = async (_req, res) => {
  const data = await Contact.find({}, 'name favorite phone email')
  sendSuccessRes(res, { data })
}

const getContactById = async (req, res) => {
  const { contactId } = req.params
  const data = await Contact.findById(contactId, 'name favorite phone email')
  if (!data) {
    throw new NotFound(`id=${contactId} Not Found`)
  }
  sendSuccessRes(res, data)
}

const addContact = async (req, res) => {
  const data = await Contact.create(req.body)
  sendSuccessRes(res, data, 201)
}

const updateContactById = async (req, res) => {
  const { contactId } = req.params
  const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true })
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
  sendSuccessRes(res, { message: 'contact deleted' })
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

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContactById,
  removeContactById,
  updateStatusContact
}
