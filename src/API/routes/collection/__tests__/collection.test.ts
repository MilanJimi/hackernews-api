import { ErrorCode } from 'src/API/errors/enums'
import { app } from 'src/app'
import { db } from 'src/db/database'
import supertest from 'supertest'

jest.mock('src/db/requests/collection')
jest.mock('src/API/middleware/authenticate')

describe('User management', () => {
  beforeEach(async () => {
    jest.clearAllMocks()
  })

  test('Create new collection', async () => {
    const name = 'New Collection Name'
    const ownerId = 'mock_user_id'

    const res = await supertest(app)
      .post('/collection/new')
      .send({ name })
      .expect(200)
    expect(res.body).toEqual({ message: 'OK', id: 'mock_id' })
    expect(db.collection.save).toBeCalledTimes(1)
    expect(db.collection.save).toBeCalledWith(ownerId, name)
  })

  test('Get collection', async () => {
    const ownerId = 'mock_user_id'
    const collectionId = 'mock_id'

    const res = await supertest(app)
      .get(`/collection/${collectionId}`)
      .expect(200)
    expect(res.body).toEqual({
      message: 'OK',
      collection: {
        id: collectionId,
        name: 'mock name',
        owner_id: ownerId
      }
    })
    expect(db.collection.get).toBeCalledTimes(1)
    expect(db.collection.get).toBeCalledWith(ownerId, collectionId)
  })

  test('Get collection - Success', async () => {
    const ownerId = 'mock_user_id'
    const collectionId = 'mock_id'

    const res = await supertest(app)
      .get(`/collection/${collectionId}`)
      .expect(200)
    expect(res.body).toEqual({
      message: 'OK',
      collection: {
        id: collectionId,
        name: 'mock name',
        owner_id: ownerId
      }
    })
    expect(db.collection.get).toBeCalledTimes(1)
    expect(db.collection.get).toBeCalledWith(ownerId, collectionId)
  })

  test('Update collection', async () => {
    const collectionId = 'mock_id'
    const newName = 'new_mock_name'

    const res = await supertest(app)
      .put(`/collection/${collectionId}`)
      .send({ name: newName })
      .expect(200)
    expect(res.body).toEqual({
      message: 'OK'
    })
    expect(db.collection.update).toBeCalledTimes(1)
    expect(db.collection.update).toBeCalledWith(collectionId, newName)
  })

  test('Delete collection', async () => {
    const ownerId = 'mock_user_id'
    const collectionId = 'mock_id'

    const res = await supertest(app)
      .delete(`/collection/${collectionId}`)
      .expect(200)
    expect(res.body).toEqual({
      message: 'OK'
    })
    expect(db.collection.delete).toBeCalledTimes(1)
    expect(db.collection.delete).toBeCalledWith(ownerId, collectionId)
  })

  test('Get collection - Fail', async () => {
    jest.spyOn(db.collection, 'get').mockImplementation(async () => [])
    const collectionId = 'non_existing_collection'

    const res = await supertest(app)
      .get(`/collection/${collectionId}`)
      .expect(404)
    expect(res.body).toEqual({
      error: ErrorCode.collectionNotFound
    })
  })
})
