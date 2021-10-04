const express = require('express')

const router = express.Router()

const {
  joiSchema,
  joiSchemaStatusContact,
  // updateFavoriteJoiSchema
} = require('../../models')
const {
  validation,
  controllerWrapper,
  validationStatusContact
} = require('../../middlewares')
const { contacts: ctrl } = require('../../controllers')

router.get('/', controllerWrapper(ctrl.listContacts))

router.get('/:contactId', controllerWrapper(ctrl.getContactById))

router.post('/', validation(joiSchema), controllerWrapper(ctrl.addContact))

router.put('/:contactId', validation(joiSchema), controllerWrapper(ctrl.updateContactById))

router.patch('/:contactId/favorite', validationStatusContact(joiSchemaStatusContact), controllerWrapper(ctrl.updateStatusContact))
// router.patch('/:contactId/favorite', validationStatusContact(updateFavoriteJoiSchema), controllerWrapper(ctrl.updateStatusContact))

router.delete('/:contactId', controllerWrapper(ctrl.removeContactById))

module.exports = router
