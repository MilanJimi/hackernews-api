const { itemController } =
  jest.createMockFromModule<typeof import('../item')>('../item')

itemController.saveStory = jest
  .fn()
  .mockReturnValue([{ id: '80824072-2728-41b5-a463-32b2a374a561' }])
export { itemController }
