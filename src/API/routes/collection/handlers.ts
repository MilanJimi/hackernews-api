import { Request, Response } from 'express'
import { ErrorCode } from '../../errors/enums'
import { UserFacingError } from '../../errors/error'
import { validateRequest } from '../commmon/validation'

import {
  collectionIdSchema,
  collectionUpdateSchema,
  commonBodySchema,
  newCollectionSchema,
  storyIdSchema,
  storyInCollectionSchema
} from './schemas'
import { collectionService } from './service'

export const handleNewCollection = async (req: Request, res: Response) => {
  const { userId, name } = validateRequest(req, { body: newCollectionSchema })

  const response = await collectionService.new(userId, name)
  return res.send({ message: 'OK', id: response[0].id })
}

export const handleGetCollection = async (req: Request, res: Response) => {
  const { userId, id } = validateRequest(req, {
    params: collectionIdSchema,
    body: commonBodySchema
  })

  const response = await collectionService.get(userId, id)
  if (!response) throw new UserFacingError(ErrorCode.collectionNotFound, 404)
  return res.send({ message: 'OK', collection: response })
}

export const handleUpdateCollection = async (req: Request, res: Response) => {
  const { userId, id, name } = validateRequest(req, {
    params: collectionIdSchema,
    body: collectionUpdateSchema
  })
  await collectionService.update(userId, id, name)
  return res.send({ message: 'OK' })
}

export const handleDeleteCollection = async (req: Request, res: Response) => {
  const { userId, id } = validateRequest(req, {
    params: collectionIdSchema,
    body: commonBodySchema
  })

  await collectionService.delete(userId, id)
  return res.send({ message: 'OK' })
}

export const handleAddToCollection = async (req: Request, res: Response) => {
  const { userId, id, storyId } = validateRequest(req, {
    params: collectionIdSchema,
    body: storyIdSchema
  })

  await collectionService.add(userId, id, storyId)
  return res.send({ message: 'Job started' })
}

export const handleGetStory = async (req: Request, res: Response) => {
  const { userId, collectionId, storyId } = validateRequest(req, {
    params: storyInCollectionSchema,
    body: commonBodySchema
  })

  const story = await collectionService.getStory(userId, collectionId, storyId)
  if (!story) throw new UserFacingError(ErrorCode.noSuchItem, 404)

  return res.send(story)
}
