const router = require('express').Router()

const userServices = require('./users.services')

router.route('/').get(userServices.getAllUsers)
.post(userServices.postNewUsers)

router.route('/:id')
.get(userServices.getUserById)
.patch(userServices.patchUser)
.delete(userServices.deleteUser)

module.exports = router