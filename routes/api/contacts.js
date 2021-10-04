const express = require('express')

const {
  joiSchema,
  // joiSchemaStatusContact,
  updateFavoriteJoiSchema
} = require('../../models')
const {
  validation,
  controllerWrapper,
  validationStatusContact
} = require('../../middlewares')
const { contacts: ctrl } = require('../../controllers')

const router = express.Router()

router.get('/', controllerWrapper(ctrl.getAll))

router.get('/:contactId', controllerWrapper(ctrl.getContactById))

router.post('/', validation(joiSchema), controllerWrapper(ctrl.addContact))

router.put('/:contactId', validation(joiSchema), controllerWrapper(ctrl.updateContactById))

// router.patch('/:contactId/favorite', validationStatusContact(joiSchemaStatusContact), controllerWrapper(ctrl.updateStatusContact))
router.patch('/:contactId/favorite', validationStatusContact(updateFavoriteJoiSchema), controllerWrapper(ctrl.updateStatusContact))

router.delete('/:contactId', controllerWrapper(ctrl.removeContactById))

module.exports = router
