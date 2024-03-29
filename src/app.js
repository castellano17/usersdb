const express = require('express')
const cors = require('cors')
require('dotenv').config()

const userRouter = require('./users/users.router')
const authRouter = require('./auth/auth.router')

const db = require('./utils/database')

const app =express()

const PORT = process.env.PORT || 3000

.db.authenticate()
.then(() => console.log("Database Authenticated!"))
.catch((err) => console.log(err));

db.sync()
.then(() => console.log("Database Synced!"))
.catch((err) => console.log(err));

app.use(express.json())
app.use(cors())


const loggerMiddleware = (req, res, next)=>{
    console.log(`${req.method} | ${req.path}`)
    if(req.method !== 'DELETE'){
        next()
        return
    }
    res.status(400).json({message: 'Ey no hagas delete! >:C'})
}

app.use(loggerMiddleware)


app.get('/', (req, res)=>{
    res.status(200).json({message: 'Server ok!', myMessage: req.saludo})
    
})


app.use('/api/v1/users', userRouter)
app.use('/api/v1/auth', authRouter)

app.listen(PORT, ()=>{
    console.log(`Server started at port ${PORT}`);
})