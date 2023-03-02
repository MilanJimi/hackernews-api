import { dbClient } from '../client'

type UsersDb = {
  id: string
  username: string
  password: string
}
const usersColumns = ['users.id', 'users.username', 'users.password']

export const userController = {
  saveUser: async (username: string, password: string) => {
    await dbClient('users').insert({ username, password })
  },

  getUser: async (username: string) =>
    dbClient('users').select<UsersDb[]>(usersColumns).where({ username })
}
