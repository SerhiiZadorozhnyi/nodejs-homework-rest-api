const { NotFound } = require('http-errors')

const { sendSuccessRes } = require('../../helpers')
const { Contact } = require('../../models')

const getById = async (req, res) => {
  const { contactId } = req.params
  const result = await Contact.findById(contactId, 'name favorite phone email')
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} Not Found`)
  }
  sendSuccessRes(res, result)
}

module.exports = getById
