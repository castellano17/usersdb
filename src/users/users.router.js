const router = require('express').Router()

const userServices = require('./users.services')
const jwtPassport = require('../middlewares/passport.midleware')

router.route('/')
.get(userServices.getAllUsers)
//.get(jwtPassport.authenticate('jwt', {session: false}), userServices.getAllUsers)
.post(userServices.postNewUsers)

router.route('/me')
.get(jwtPassport.authenticate('jwt', {session: false}), userServices.getMyUser)

router.route('/:id')
.get(userServices.getUserById)
//.get(jwtPassport.authenticate('jwt', {session: false}), userServices.getUserById)
.patch(userServices.patchUser)
.delete(userServices.deleteUser)



module.exports = router