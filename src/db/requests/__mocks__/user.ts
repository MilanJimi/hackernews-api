const { userController } =
  jest.createMockFromModule<typeof import('../user')>('../user')

const mockUsers = [
  {
    id: 'existing_user_id',
    username: 'Existing User',
    password: '$2b$10$aX7uHQDjTi6M82oQztmf5uR3AZ1GhFRfh4FpXg2OZAgmJ8sE9UvOG' // Generated from password: 'pass'
  }
]

userController.getUser = jest
  .fn()
  .mockImplementation((username: string) =>
    mockUsers.filter((user) => user.username === username)
  )

export { userController }
