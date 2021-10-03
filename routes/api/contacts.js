const express = require('express')
const router = express.Router()
const { contact: ctrl } = require('../../controllers')

const {
  joiSchema,
  joiSchemaStatusContact
} = require('../../models')

const {
  validation,
  controllerWrapper,
  validationStatusContact,
} = require('../../middlewares')

router.get('/', controllerWrapper(ctrl.listContacts))

router.get('/:contactId', controllerWrapper(ctrl.getContactById))

router.post('/', validation(joiSchema), controllerWrapper(ctrl.addContact))

router.put('/:contactId', validation(joiSchema), controllerWrapper(ctrl.updateContactById))

router.delete('/:contactId', controllerWrapper(ctrl.removeContactById))

router.patch('/:contactId/favorite', validationStatusContact(joiSchemaStatusContact), controllerWrapper(ctrl.updateStatusContact))

module.exports = router
