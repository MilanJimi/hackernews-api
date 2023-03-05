import { Request, Response } from 'express'
import { ErrorCode } from '../../errors/enums'
import { UserFacingError } from '../../errors/error'

import {
  collectionIdSchema,
  collectionUpdateSchema,
  newCollectionSchema,
  storyIdSchema
} from './schemas'
import { collectionService } from './service'

export const handleNewCollection = async (req: Request, res: Response) => {
  const { error, value } = newCollectionSchema.validate(req.body)
  if (error) throw new UserFacingError(ErrorCode.validationFail, 400)

  const response = await collectionService.new(value.userId, value.name)
  return res.send({ message: 'OK', id: response[0].id })
}

export const handleGetCollection = async (req: Request, res: Response) => {
  const { error, value } = collectionIdSchema.validate(req.params)
  if (error) throw new UserFacingError(ErrorCode.validationFail, 400)

  const response = await collectionService.get(req.body.userId, value.id)
  if (response.length === 0)
    throw new UserFacingError(ErrorCode.collectionNotFound, 404)
  return res.send({ message: 'OK', collection: response[0] })
}

export const handleUpdateCollection = async (req: Request, res: Response) => {
  const { error: paramsError, value: paramsValue } =
    collectionIdSchema.validate(req.params)
  if (paramsError) throw new UserFacingError(ErrorCode.validationFail, 400)
  const { error: bodyError, value: bodyValue } =
    collectionUpdateSchema.validate(req.body)
  if (bodyError) throw new UserFacingError(ErrorCode.validationFail, 400)

  await collectionService.update(
    bodyValue.userId,
    paramsValue.id,
    bodyValue.name
  )
  return res.send({ message: 'OK' })
}

export const handleDeleteCollection = async (req: Request, res: Response) => {
  const { error, value } = collectionIdSchema.validate(req.params)
  if (error) throw new UserFacingError(ErrorCode.validationFail, 400)

  await collectionService.delete(req.body.userId, value.id)
  return res.send({ message: 'OK' })
}

export const handleAddToCollection = async (req: Request, res: Response) => {
  const { error: paramsError, value: paramsValue } =
    collectionIdSchema.validate(req.params)
  if (paramsError) throw new UserFacingError(ErrorCode.validationFail, 400)
  const { error: bodyError, value: bodyValue } = storyIdSchema.validate(
    req.body
  )
  if (bodyError) throw new UserFacingError(ErrorCode.validationFail, 400)

  await collectionService.add(
    req.body.userId,
    paramsValue.id,
    bodyValue.storyId
  )
  return res.send({ message: 'Job started' })
}
