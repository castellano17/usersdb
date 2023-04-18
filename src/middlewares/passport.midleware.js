const passport = require('passport') //* librería base

const JwtStrategy = require('passport-jwt').Strategy //* la manera que se va usar
const ExtractJwt = require('passport-jwt').ExtractJwt //* para obtener el token para que passport lo pueda manejar

const {findUserById} = require('../users/users.controllers')

//* opciones para pasar a nuestra extrategia de passport

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'Ac4d3ml0vers'
}

passport.use(new JwtStrategy(options, (tokenDecoded, done)=>{
    //! done(error, user)

    //* done(null, false,) //no existe un error pero tampoco existe un usuario
    //* done ( error, false) // existe un error, y no existe un usuario
    //* done(null, user) // no existe un error, pero existe un usuario

    findUserById(tokenDecoded.id)
    .then(user => {
        if(user){
            done(null, user)
        }else{
            done(null, false)
        }
    })
    .catch(err => {
        done(err, false)
    })
} ))

module.exports = passport