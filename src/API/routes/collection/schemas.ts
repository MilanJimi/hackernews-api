import Joi from 'joi'

type CommonBody = {
  userId: string
}

type NewCollectionRequest = CommonBody & {
  name: string
}
type CollectionIdParams = {
  id: string
}
type StoryInCollectionParams = {
  collectionId: string
  storyId: number
}

type StoryIdRequest = CommonBody & {
  storyId: number
}
type CollectionUpdateRequest = CommonBody & {
  name: string
}

export const commonBodySchema = Joi.object<CommonBody>({
  userId: Joi.string()
})

export const newCollectionSchema = Joi.object<NewCollectionRequest>({
  userId: Joi.string(),
  name: Joi.string()
})

export const collectionIdSchema = Joi.object<CollectionIdParams>({
  id: Joi.string()
})

export const storyInCollectionSchema = Joi.object<StoryInCollectionParams>({
  collectionId: Joi.string(),
  storyId: Joi.number()
})

export const storyIdSchema = Joi.object<StoryIdRequest>({
  userId: Joi.string(),
  storyId: Joi.number()
})

export const collectionUpdateSchema = Joi.object<CollectionUpdateRequest>({
  userId: Joi.string(),
  name: Joi.string()
})
