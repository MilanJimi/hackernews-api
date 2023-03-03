import Joi from 'joi'

type NewCollectionRequest = {
  userId: string
  name: string
}
type CollectionIdParams = {
  id: string
}
type CollectionAddParams = {
  collectionId: string
  storyId: number
}
type CollectionUpdateRequest = {
  userId: string
  name: string
}

export const newCollectionSchema = Joi.object<NewCollectionRequest>({
  userId: Joi.string(),
  name: Joi.string()
})

export const addToCollectionSchema = Joi.object<CollectionAddParams>({
  collectionId: Joi.string(),
  storyId: Joi.number()
})

export const collectionIdSchema = Joi.object<CollectionIdParams>({
  id: Joi.string()
})

export const collectionUpdateSchema = Joi.object<CollectionUpdateRequest>({
  userId: Joi.string(),
  name: Joi.string()
})
