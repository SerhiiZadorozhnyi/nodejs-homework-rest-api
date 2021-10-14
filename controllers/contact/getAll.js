const { sendSuccessRes } = require('../../helpers')
const { Contact } = require('../../models')

const getAll = async (req, res) => {
  const result = await Contact.find({ owner: req.user._id })
  sendSuccessRes(res, { result })
}

module.exports = getAll
