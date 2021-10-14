const { NotFound } = require('http-errors')

const { sendSuccessRes } = require('../../helpers')
const { Contact } = require('../../models')

const updateById = async (req, res) => {
  const { contactId } = req.params
  const owner = req.user._id
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    req.body,
    {
      new: true
    }
  )
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`)
  }
  sendSuccessRes(res, { result })
}

module.exports = updateById
