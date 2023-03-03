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

const getCollection = (id: string) => db.collection.get(id)
const handleCollectionAccess = async (userId: string, id: string) => {
  const collection = await getCollection(id)
  if (collection.length === 0)
    throw new UserFacingError(ErrorCode.collectionNotFound, 404)
  if (collection[0].owner_id !== userId)
    throw new UserFacingError(ErrorCode.unauthorized, 401)
  return collection
}

export const collectionService = {
  get: (userId: string, id: string) => handleCollectionAccess(userId, id),
  update: async (userId: string, id: string, name: string) => {
    await handleCollectionAccess(userId, id)

    return await db.collection.update(id, name)
  },
  new: (userId: string, name: string) => db.collection.save(userId, name),
  delete: async (userId: string, id: string) => {
    await handleCollectionAccess(userId, id)

    return await db.collection.delete(id)
  },
  add: async (userId: string, collectionId: string, storyId: number) => {
    await handleCollectionAccess(userId, collectionId)

    const story = await hackernewsIntegration.getStory(storyId)
    const savedStory = (await db.item.saveStory(collectionId, story))[0]
    logger.debug(`Saved story ${story.id}`)
    story.kids &&
      story.kids.forEach((kid) => addCommentTree(savedStory.id, kid))
  }
}
