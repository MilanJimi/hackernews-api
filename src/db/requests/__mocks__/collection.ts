const { collectionController } =
  jest.createMockFromModule<typeof import('../collection')>('../collection')
const mockCollection = [
  {
    id: 'bf44413c-7ed5-4036-b497-b3ebb9480abe',
    name: 'mock name',
    owner_id: 'mock_user_id'
  }
]

collectionController.get = jest.fn().mockImplementation((id: string) => {
  return mockCollection.filter((coll) => coll.id === id)
})

collectionController.save = jest.fn().mockReturnValue(mockCollection)

export { collectionController }
