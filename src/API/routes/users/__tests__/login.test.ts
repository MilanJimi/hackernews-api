import { app } from 'src/app'
import { db } from 'src/db/database'
import supertest from 'supertest'

import { ErrorCode } from '../../../errors/enums'

jest.mock('src/db/requests/user')

describe('User management', () => {
  beforeEach(async () => {
    jest.clearAllMocks()
  })

  test('Register - Existing user', async () => {
    const username = 'Existing User'
    const password = 'NewPass'

    const res = await supertest(app)
      .post('/users/register')
      .send({ username, password })
      .expect(409)
    expect(res.body).toEqual({ error: ErrorCode.userAlreadyExists })
    expect(db.user.getUser).toBeCalledTimes(1)
    expect(db.user.getUser).toBeCalledWith(username)
    expect(db.user.saveUser).toBeCalledTimes(0)
  })

  test('Login - Success', async () => {
    const username = 'Existing User'
    const password = 'pass'

    const res = await supertest(app)
      .post('/users/login')
      .send({ username, password })
      .expect(200)
    expect(res.body).toMatchObject({ accessToken: expect.stringContaining('') })
    expect(db.user.getUser).toBeCalledTimes(1)
    expect(db.user.getUser).toBeCalledWith(username)
  })

  test('Login - Wrong password', async () => {
    const username = 'Existing User'
    const password = 'WrongPass'

    const res = await supertest(app)
      .post('/users/login')
      .send({ username, password })
      .expect(401)
    expect(res.body).toMatchObject({ error: ErrorCode.unauthorized })
  })

  test('Login - Wrong Username', async () => {
    const username = 'New User'
    const password = 'pass'

    const res = await supertest(app)
      .post('/users/login')
      .send({ username, password })
      .expect(401)
    expect(res.body).toMatchObject({ error: ErrorCode.unauthorized })
  })

  test('Register - New user', async () => {
    const username = 'New User'
    const password = 'NewPass'

    await supertest(app)
      .post('/users/register')
      .send({ username, password })
      .expect(200)
    expect(db.user.getUser).toBeCalledTimes(1)
    expect(db.user.getUser).toBeCalledWith(username)
    expect(db.user.saveUser).toBeCalledWith(
      username,
      expect.stringMatching(new RegExp(`((?!${password}).)*`)) // Does not contain password, just hash
    )
  })
})
