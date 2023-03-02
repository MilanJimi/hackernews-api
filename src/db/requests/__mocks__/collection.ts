const { collectionController } =
  jest.createMockFromModule<typeof import('../collection')>('../collection')
const mockCollection = [
  {
    id: 'mock_id',
    name: 'mock name',
    owner_id: 'mock_user_id'
  }
]

collectionController.get = jest
  .fn()
  .mockImplementation((ownerId: string, id: string) => {
    return mockCollection.filter((coll) => coll.id === id)
  })

collectionController.save = jest.fn().mockReturnValue(mockCollection)

export { collectionController }
