const { Conflict } = require('http-errors')
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')
const { sendMail } = require('../../utils')
const { User } = require('../../models')
const { v4 } = require('uuid')

const signup = async(req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    throw new Conflict('Already registered')
  }

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
  const defaultAvatar = gravatar.url(email, { s: '250' }, true)
  const { subscription, verifyToken } = await User.create({
    email,
    password: hashPassword,
    avatarUrl: defaultAvatar,
    verifyToken: v4()
  })

  const signupEmail = {
    to: email,
    subject: 'Registration',
    html: `<a href="http://localhost:3000/api/users/verify/${verifyToken}">Confirm registration</a>`
  }
  await sendMail(signupEmail)

  res.status(201).json({
    status: 'success',
    code: 201,
    data: {
      email,
      subscription
    }
  })
}

module.exports = signup
