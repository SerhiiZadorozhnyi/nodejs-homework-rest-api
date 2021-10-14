const { NotFound, BadRequest } = require('http-errors')

const { sendSuccessRes } = require('../../helpers')
const { Contact } = require('../../models')

const updateStatus = async (req, res) => {
  const { contactId } = req.params
  const owner = req.user._id
  const { favorite } = req.body
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner },
    { favorite },
    { new: true }
  )
  if (favorite === undefined) {
    throw new BadRequest('missing field favorite')
  }
  if (!result) {
    throw new NotFound(`Contact with id=${contactId} not found`)
  }
  sendSuccessRes(res, { result })
}

module.exports = updateStatus
