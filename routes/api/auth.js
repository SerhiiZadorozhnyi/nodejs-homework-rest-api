const express = require('express')

const {
  validation,
  controllerWrapper,
  authenticate,
  upload
} = require('../../middlewares')
const {
  joiSchema,
  joiSchemaSub,
  joiSchemaVerify
} = require('../../models/user')
const { auth: ctrl } = require('../../controllers')

const router = express.Router()

router.post('/signup', validation(joiSchema), controllerWrapper(ctrl.signup))

router.post('/login', validation(joiSchema), controllerWrapper(ctrl.login))

router.get('/logout', controllerWrapper(authenticate), controllerWrapper(ctrl.logout))

router.get('/current', controllerWrapper(authenticate), controllerWrapper(ctrl.current))

router.get('/', controllerWrapper(authenticate), validation(joiSchemaSub), controllerWrapper(ctrl.subscription))

router.patch('/avatars', controllerWrapper(authenticate), upload.single('avatar'), controllerWrapper(ctrl.updateAvatar))

router.get('/verify/:verifyToken', controllerWrapper(ctrl.verify))

router.post('/verify', validation(joiSchemaVerify), controllerWrapper(ctrl.reVerify))

module.exports = router
