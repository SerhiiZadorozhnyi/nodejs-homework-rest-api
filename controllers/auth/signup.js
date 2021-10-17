const { Conflict } = require('http-errors')
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')

const { User } = require('../../models')

const signup = async(req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict('Already registered')
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  const defaultAvatar = gravatar.url(email, { s: '250' }, true)
  // await User.create({ email, password: hashPassword })
  const { subscription } = await User.create({
    email,
    password: hashPassword,
    avatarUrl: defaultAvatar
  })

  res.status(201).json({
    status: 'success',
    code: 201,
    // message: 'Register success'
    data: {
      email,
      subscription
    }
  })
}

module.exports = signup
