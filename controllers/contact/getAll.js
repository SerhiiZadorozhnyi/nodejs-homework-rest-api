const { sendSuccessRes } = require('../../helpers')
const { Contact } = require('../../models')

const getAll = async (req, res) => {
  const result = await Contact.find({}, 'name favorite phone email')
  sendSuccessRes(res, { result })
}

module.exports = getAll
