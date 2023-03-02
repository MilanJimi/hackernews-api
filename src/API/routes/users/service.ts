import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { ErrorCode } from 'src/API/errors/enums'
import { UserFacingError } from 'src/API/errors/error'
import { config } from 'src/config/config'
import { db } from 'src/db/database'

export const userService = {
  login: async (username: string, password: string) => {
    const dbUsers = await db.user.getUser(username)
    if (dbUsers.length !== 1)
      throw new UserFacingError(ErrorCode.unauthorized, 401)

    if (await bcrypt.compare(password, dbUsers[0].password)) {
      const accessToken = jwt.sign(dbUsers[0].id, config.accessTokenSecret)
      return accessToken
    }
    throw new UserFacingError(ErrorCode.unauthorized, 401)
  },

  register: async (username: string, password: string) => {
    if ((await db.user.getUser(username)).length > 0)
      throw new UserFacingError(ErrorCode.userAlreadyExists, 409)

    const passwordHash = await bcrypt.hash(password, 10)
    await db.user.saveUser(username, passwordHash)
  }
}
