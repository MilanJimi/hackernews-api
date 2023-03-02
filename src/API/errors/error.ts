import { ErrorCode } from 'src/API/errors/enums'

export class UserFacingError extends Error {
  userFacingMessage: ErrorCode
  code?: number

  constructor(userFacingMessage: ErrorCode, code?: number) {
    super(userFacingMessage)
    this.userFacingMessage = userFacingMessage
    this.code = code
  }
}
