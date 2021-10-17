const express = require('express')

const {
  controllerWrapper,
  authenticate,
  upload
} = require('../../middlewares')
const { users: ctrl } = require('../../controllers')

const router = express.Router()

router.path('/avatars', controllerWrapper(authenticate), upload.single('avatar'), controllerWrapper(ctrl.updateAvatar))

module.exports = router
