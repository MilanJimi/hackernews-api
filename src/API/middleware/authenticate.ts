import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { config } from '../../config/config'
import { ErrorCode } from '../../API/errors/enums'
import { UserFacingError } from '../../API/errors/error'

export type AuthenticatedRequest<T = Request> = T & {
  user: string
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) throw new UserFacingError(ErrorCode.unauthorized, 401)

  jwt.verify(token, config.accessTokenSecret, (err, userId) => {
    if (err) throw new UserFacingError(ErrorCode.unauthorized, 401)
    req.body.userId = userId
    return next()
  })
  return
}
