import { config } from 'src/config/config'
import { app } from './src/app'
import { logger } from './src/logging/logger'

const { port } = config
app.listen(port, () => logger.info(`App started at ${port}`))
