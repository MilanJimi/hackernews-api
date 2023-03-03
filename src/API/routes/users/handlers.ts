import { Request, Response } from 'express'
import { ErrorCode } from '../../errors/enums'
import { UserFacingError } from '../../errors/error'
import { loginSchema, newUserSchema } from './schemas'
import { userService } from './service'

export const handleLogin = async (req: Request, res: Response) => {
  const { error, value } = loginSchema.validate(req.body)
  if (error) throw new UserFacingError(ErrorCode.validationFail, 400)

  const { username, password } = value
  const accessToken = await userService.login(username, password)
  return res.json({ accessToken })
}

export const handleRegister = async (req: Request, res: Response) => {
  const { error, value } = newUserSchema.validate(req.body)
  if (error) throw new UserFacingError(ErrorCode.validationFail, 400)
  const { username, password } = value

  await userService.register(username, password)
  return res.send({ message: 'OK' })
}
