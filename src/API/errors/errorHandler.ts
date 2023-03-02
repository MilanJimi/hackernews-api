import { NextFunction, Request, Response } from 'express'
import { logger } from 'src/logging/logger'
import { ErrorCode } from './enums'
import { UserFacingError } from './error'

type PromiseFunction = (
  req: Request,
  res: Response,
  next?: NextFunction
) => Promise<unknown>

export const catchExceptions =
  (handler: PromiseFunction) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await handler(req, res, next)
    } catch (error: unknown) {
      if (error instanceof Error) logger.error(error.message)
      if (error instanceof UserFacingError)
        return res
          .status(error.code ?? 500)
          .send({ error: error.userFacingMessage })
      return res.status(500).send({ error: ErrorCode.unknown })
    }
  }
