const express = require('express')

const router = express.Router()

const { joiSchema } = require('../../models/contact')
const { validation, controllerWrapper, authenticate } = require('../../middlewares')
const { contacts: ctrl } = require('../../controllers')

router.get('/', controllerWrapper(authenticate), controllerWrapper(ctrl.getAll))

router.get('/:contactId', controllerWrapper(authenticate), controllerWrapper(ctrl.getById))

router.post('/', controllerWrapper(authenticate), validation(joiSchema), controllerWrapper(ctrl.add))

router.put('/:contactId', controllerWrapper(authenticate), validation(joiSchema), controllerWrapper(ctrl.updateById))

router.patch('/:contactId/favorite', controllerWrapper(authenticate), controllerWrapper(ctrl.updateStatus))

router.delete('/:contactId', controllerWrapper(authenticate), controllerWrapper(ctrl.removeById))

module.exports = router
