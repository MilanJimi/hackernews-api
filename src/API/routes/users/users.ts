import express from 'express'
import { catchExceptions } from '../../errors/errorHandler'

import { handleLogin, handleRegister } from './handlers'

const userRouter = express()

userRouter.post('/register', catchExceptions(handleRegister))
userRouter.post('/login', catchExceptions(handleLogin))

export { userRouter }
