/*

Login Process
- mandar email y password
- Busqueda por email encontramos toda la info del usuario
- Id, la contraseña encriptada (para validar) y role
- validar si la password es correcta

*/

const {findUserByEmail} = require('../users/users.controllers')
const { comparePassword } = require('../utils/crypto')

const checkUserCredentials = async (email, password) => {

    // User | false
    const user = await findUserByEmail(email)

    const validatePassword = comparePassword(password, user.password )
    // if(!validatePassword){
    //     return false
    // }
    // return user

    return validatePassword ? user : false
    
}

module.exports = checkUserCredentials