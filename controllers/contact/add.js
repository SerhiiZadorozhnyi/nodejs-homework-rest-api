const { sendSuccessRes } = require('../../helpers')
const { Contact } = require('../../models')

const add = async (req, res) => {
  const newContact = { ...req.body, owner: req.user._id }
  const result = await Contact.create(newContact)
  sendSuccessRes(res, result, 201)
}

module.exports = add
