import dotenv from 'dotenv'
dotenv.config()
import { app } from './src/app'
import { logger } from './src/logging/logger'

const port = process.env.PORT ?? 3000
app.listen(port, () => logger.info(`App started at ${port}`))
