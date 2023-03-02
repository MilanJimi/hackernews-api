import express from 'express'
import { catchExceptions } from 'src/API/errors/errorHandler'

import { authenticate } from '../../middleware/authenticate'
import { handleLogin, handleRegister } from './handlers'

const userRouter = express()

userRouter.post('/register', catchExceptions(handleRegister))
userRouter.post('/login', catchExceptions(handleLogin))
userRouter.use(authenticate)

export { userRouter }
