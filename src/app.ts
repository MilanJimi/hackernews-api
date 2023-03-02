import express, { json } from 'express'
import { userRouter } from './API/routes/users/users'
import { logRequest, logResponse } from './logging/logger'

const app = express()

app.use(json(), logRequest, logResponse)

app.use('/users', userRouter)

export { app }
