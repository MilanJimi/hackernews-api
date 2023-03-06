import { ErrorCode } from 'src/API/errors/enums'
import { app } from 'src/app'
import { db } from 'src/db/database'
import { mockDbComments, mockDbStories } from 'src/db/requests/__mocks__/item'
import supertest from 'supertest'

jest.mock('src/db/requests/collection')
jest.mock('src/db/requests/item')
jest.mock('src/API/middleware/authenticate')

describe('Collection CRUD', () => {
  beforeEach(async () => {
    jest.clearAllMocks()
  })

  // NEW
  test('Create new collection', async () => {
    const name = 'New Collection Name'
    const ownerId = 'mock_user_id'

    const res = await supertest(app)
      .post('/collection/new')
      .send({ name })
      .expect(200)
    expect(res.body).toEqual({
      message: 'OK',
      id: 'bf44413c-7ed5-4036-b497-b3ebb9480abe'
    })
    expect(db.collection.save).toBeCalledTimes(1)
    expect(db.collection.save).toBeCalledWith(ownerId, name)
  })

  // GET
  test('Get collection - Success', async () => {
    const ownerId = 'mock_user_id'
    const collectionId = 'bf44413c-7ed5-4036-b497-b3ebb9480abe'
    const res = await supertest(app)
      .get(`/collection/${collectionId}`)
      .expect(200)
    expect(res.body).toEqual({
      message: 'OK',
      collection: {
        id: collectionId,
        name: 'mock name',
        owner_id: ownerId,
        stories: [8863]
      }
    })
    expect(db.collection.getWithStories).toBeCalledTimes(1)
    expect(db.collection.getWithStories).toBeCalledWith(collectionId)
  })

  test('Get collection - Not own collection - Fail', async () => {
    const userId = 'different_mock_user_id'
    const collectionId = 'bf44413c-7ed5-4036-b497-b3ebb9480abe'

    const res = await supertest(app)
      .get(`/collection/${collectionId}`)
      .send({ userId })
      .expect(401)
    expect(res.body).toEqual({
      error: ErrorCode.unauthorized
    })
  })

  test('Get collection - No such collection - Fail', async () => {
    const collectionId = 'different_mock_id'

    const res = await supertest(app)
      .get(`/collection/${collectionId}`)
      .expect(404)
    expect(res.body).toEqual({
      error: ErrorCode.collectionNotFound
    })
  })

  // GET STORY
  test('Get story in collection - Success', async () => {
    const collectionId = 'bf44413c-7ed5-4036-b497-b3ebb9480abe'
    const storyId = 8863
    const res = await supertest(app)
      .get(`/collection/${collectionId}/${storyId}`)
      .expect(200)
    expect(res.body).toEqual({
      ...mockDbStories.find(({ story_id }) => storyId === story_id),
      comments: mockDbComments
    })
    expect(db.item.getStoryWithComments).toBeCalledTimes(1)
    expect(db.item.getStoryWithComments).toBeCalledWith(collectionId, storyId)
  })

  test('Get story in collection - Not own collection - Fail', async () => {
    const userId = 'different_mock_user_id'
    const collectionId = 'bf44413c-7ed5-4036-b497-b3ebb9480abe'
    const storyId = 8863

    const res = await supertest(app)
      .get(`/collection/${collectionId}/${storyId}`)
      .send({ userId })
      .expect(401)
    expect(res.body).toEqual({
      error: ErrorCode.unauthorized
    })
  })

  test('Get story in collection - No such story - Fail', async () => {
    const collectionId = 'different_mock_id'
    const storyId = 8863

    const res = await supertest(app)
      .get(`/collection/${collectionId}/${storyId}`)
      .expect(404)
    expect(res.body).toEqual({
      error: ErrorCode.collectionNotFound
    })
  })

  // UPDATE
  test('Update collection - Success', async () => {
    const collectionId = 'bf44413c-7ed5-4036-b497-b3ebb9480abe'
    const newName = 'new_mock_name'

    const res = await supertest(app)
      .patch(`/collection/${collectionId}`)
      .send({ name: newName })
      .expect(200)
    expect(res.body).toEqual({
      message: 'OK'
    })
    expect(db.collection.update).toBeCalledTimes(1)
    expect(db.collection.update).toBeCalledWith(collectionId, newName)
  })

  test('Update collection - not own collection - Fail', async () => {
    const userId = 'different_user_id'
    const collectionId = 'bf44413c-7ed5-4036-b497-b3ebb9480abe'
    const newName = 'new_mock_name'

    const res = await supertest(app)
      .patch(`/collection/${collectionId}`)
      .send({ name: newName, userId })
      .expect(401)
    expect(res.body).toEqual({
      error: ErrorCode.unauthorized
    })
    expect(db.collection.update).toBeCalledTimes(0)
  })

  test('Update collection - no such collection - Fail', async () => {
    const collectionId = 'different_mock_id'
    const newName = 'new_mock_name'

    const res = await supertest(app)
      .patch(`/collection/${collectionId}`)
      .send({ name: newName })
      .expect(404)
    expect(res.body).toEqual({
      error: ErrorCode.collectionNotFound
    })
    expect(db.collection.update).toBeCalledTimes(0)
  })

  // DELETE
  test('Delete collection - Success', async () => {
    const collectionId = 'bf44413c-7ed5-4036-b497-b3ebb9480abe'

    const res = await supertest(app)
      .delete(`/collection/${collectionId}`)
      .expect(200)
    expect(res.body).toEqual({
      message: 'OK'
    })
    expect(db.collection.delete).toBeCalledTimes(1)
    expect(db.collection.delete).toBeCalledWith(collectionId)
  })

  test('Delete collection - not own collection - Fail', async () => {
    const userId = 'different_mock_user_id'
    const collectionId = 'bf44413c-7ed5-4036-b497-b3ebb9480abe'

    const res = await supertest(app)
      .delete(`/collection/${collectionId}`)
      .send({ userId })
      .expect(401)
    expect(res.body).toEqual({
      error: ErrorCode.unauthorized
    })
    expect(db.collection.delete).toBeCalledTimes(0)
  })

  test('Delete collection - no such collection - Fail', async () => {
    const collectionId = 'different_mock_id'

    const res = await supertest(app)
      .delete(`/collection/${collectionId}`)
      .expect(404)
    expect(res.body).toEqual({
      error: ErrorCode.collectionNotFound
    })

    expect(db.collection.delete).toBeCalledTimes(0)
  })
})
