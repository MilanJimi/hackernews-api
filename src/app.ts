import express, { json } from 'express'
import { collectionRouter } from './API/routes/collection/collection'
import { userRouter } from './API/routes/users/users'
import { logRequest, logResponse } from './logging/logger'

const app = express()

app.use(json(), logRequest, logResponse)

app.use('/users', userRouter)
app.use('/collection', collectionRouter)

export { app }
