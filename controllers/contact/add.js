const { sendSuccessRes } = require('../../helpers')
const { Contact } = require('../../models')

const add = async (req, res) => {
  const result = await Contact.create(req.body)
  sendSuccessRes(res, result, 201)
}

module.exports = add
