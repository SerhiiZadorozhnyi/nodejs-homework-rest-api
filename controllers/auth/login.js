// const { BadReques } = require('http-errors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { Unauthorized } = require('http-errors')

const { User } = require('../../models')

// const { SECRET_KEY } = process.env

// const login = async(req, res) => {
//   const { email, password } = req.body
//   const user = await User.findOne({ email }, '_id email password')
//   if (!user || !user.comparePassword(password)) {
//     throw new BadReques('Invalid email or password')
//   }
//   const { _id } = user
//   const payload = {
//     _id
//   }
//   const token = jwt.sign(payload, SECRET_KEY)
//   await User.findByIdAndUpdate(_id, { token })
//   res.json({
//     status: 'success',
//     code: 200,
//     data: {
//       token
//     }
//   })
// }
const login = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (!user) {
    throw new Unauthorized('Email or password is wrong')
  }

  const hashPassword = user.password
  const compareResult = bcrypt.compareSync(password, hashPassword)

  if (!compareResult) {
    throw new Unauthorized('Email or password is wrong')
  }

  const payload = {
    id: user._id,
  }
  const { SECRET_KEY } = process.env
  const token = jwt.sign(payload, SECRET_KEY)
  await User.findByIdAndUpdate(user._id, { token })
  res.json({ token, user })
}

module.exports = login
