import { ErrorCode } from '../../errors/enums'
import { UserFacingError } from '../../errors/error'
import { logger } from '../../../logging/logger'
import { db } from '../../../db/database'
import { hackernewsIntegration } from '../../../integrations/hackernews/hackernewsIntegration'

const addCommentTree = async (rootStoryId: string, commentId: number) => {
  const comment = await hackernewsIntegration.getComment(commentId)
  await db.item.saveComment(rootStoryId, comment)
  logger.debug(`Saved comment ${comment.id}`)
  comment.kids &&
    comment.kids.forEach((kid) => addCommentTree(rootStoryId, kid))
}

const validateCollectionAccess = async (userId: string, id: string) => {
  const collection = await db.collection.get(id)
  if (!collection) throw new UserFacingError(ErrorCode.collectionNotFound, 404)
  if (collection.owner_id !== userId)
    throw new UserFacingError(ErrorCode.unauthorized, 401)
  return
}

export const collectionService = {
  get: async (userId: string, id: string) => {
    await validateCollectionAccess(userId, id)
    return await db.collection.getWithStories(id)
  },
  update: async (userId: string, id: string, name: string) => {
    await validateCollectionAccess(userId, id)

    return await db.collection.update(id, name)
  },
  new: (userId: string, name: string) => db.collection.save(userId, name),
  delete: async (userId: string, id: string) => {
    await validateCollectionAccess(userId, id)

    return await db.collection.delete(id)
  },
  add: async (userId: string, collectionId: string, storyId: number) => {
    await validateCollectionAccess(userId, collectionId)
    const story = await hackernewsIntegration.getStory(storyId)
    const savedStory = (await db.item.saveStory(collectionId, story))[0]
    logger.debug(`Saved story ${story.id}`)
    story.kids &&
      story.kids.forEach((kid) => addCommentTree(savedStory.id, kid))
  },
  getStory: async (userId: string, collectionId: string, storyId: number) => {
    await validateCollectionAccess(userId, collectionId)
    return await db.item.getStoryWithComments(collectionId, storyId)
  }
}
