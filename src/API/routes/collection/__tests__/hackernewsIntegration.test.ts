import { ErrorCode } from 'src/API/errors/enums'
import { app } from 'src/app'
import { db } from 'src/db/database'
import {
  mockComments,
  mockStories
} from 'src/integrations/hackernews/__mocks__/hackernewsIntegration'
import supertest from 'supertest'

jest.mock('src/db/requests/item')
jest.mock('src/db/requests/collection')
jest.mock('src/integrations/hackernews/hackernewsIntegration')
jest.mock('src/API/middleware/authenticate')

describe('Hackernews integration', () => {
  beforeEach(async () => {
    jest.clearAllMocks()
  })

  test('Add story to collection - Success', async () => {
    const storyId = 2921506
    const collectionId = 'bf44413c-7ed5-4036-b497-b3ebb9480abe'
    const rootStoryId = '80824072-2728-41b5-a463-32b2a374a561'

    const res = await supertest(app)
      .post(`/collection/${collectionId}/add/${storyId}`)
      .expect(200)
    expect(res.body).toEqual({
      message: 'Job started'
    })
    expect(db.item.saveStory).toBeCalledTimes(1)
    expect(db.item.saveStory).toBeCalledWith(
      collectionId,
      mockStories.find((story) => story.id === storyId)
    )
    expect(db.item.saveComment).toBeCalledTimes(6)
    mockComments.forEach((comment) =>
      expect(db.item.saveComment).toHaveBeenCalledWith(rootStoryId, comment)
    )
  })

  test('Add story to collection - Is actually a comment - Fail', async () => {
    const commentId = 2921983
    const collectionId = 'bf44413c-7ed5-4036-b497-b3ebb9480abe'

    const res = await supertest(app)
      .post(`/collection/${collectionId}/add/${commentId}`)
      .expect(500)
    expect(res.body).toEqual({
      error: ErrorCode.typeMismatch
    })
    expect(db.item.saveStory).toBeCalledTimes(0)
    expect(db.item.saveComment).toBeCalledTimes(0)
  })

  test('Add story to collection - No such story - Fail', async () => {
    const commentId = 0
    const collectionId = 'bf44413c-7ed5-4036-b497-b3ebb9480abe'

    const res = await supertest(app)
      .post(`/collection/${collectionId}/add/${commentId}`)
      .expect(500)
    expect(res.body).toEqual({
      error: ErrorCode.noSuchItem
    })
    expect(db.item.saveStory).toBeCalledTimes(0)
    expect(db.item.saveComment).toBeCalledTimes(0)
  })
})
