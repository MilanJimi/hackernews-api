import { Request, Response } from 'express'
import winston from 'winston'

const { combine, timestamp, printf, colorize, splat } = winston.format

export const logger = winston.createLogger({
  level: 'info',
  format: combine(
    timestamp(),
    colorize(),
    splat(),
    printf(
      ({
        error,
        timestamp,
        level,
        message
      }: winston.Logform.TransformableInfo) => {
        if (error) {
          if (error.stack)
            return `[${timestamp}] ${level}: ${message} :\n${error.stack}`
          return `[${timestamp}] ${level}: ${message} : ${error.toString()}`
        }
        return `[${timestamp}] ${level}: ${message}`
      }
    )
  ),
  transports: [new winston.transports.Console()]
})

export const logRequest = (req: Request, _: Response, next: () => unknown) => {
  const bodyString = Object.keys(req.body).length > 0 ? ' with body %o' : ''
  logger.debug(
    `Received request ${req.method}: ${req.originalUrl}${bodyString}`,
    req.body
  )
  next()
}

export const logResponse = (_: Request, res: Response, next: () => unknown) => {
  const send = res.send
  res.send = (body) => {
    logger.debug(`Responding with code: ${res.statusCode}, Body: %o`, body)
    res.send = send
    return res.send(body)
  }
  next()
}
