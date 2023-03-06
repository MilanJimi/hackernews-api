import { dbClient } from '../client'
import { itemController } from './item'

type CollectionDb = {
  id: string
  owner_id: string
  name: string
}

const collectionColumns = [
  'collections.id',
  'collections.owner_id',
  'collections.name'
]

export const collectionController = {
  save: async (ownerId: string, name: string) => {
    return await dbClient('collections')
      .insert({ name, owner_id: ownerId })
      .returning<CollectionDb[]>(collectionColumns)
  },
  update: async (id: string, name: string) => {
    return await dbClient('collections').where({ id }).update({ name })
  },
  get: async (id: string) => {
    return await dbClient('collections')
      .select<CollectionDb[]>(collectionColumns)
      .where({ id })
      .first()
  },
  getWithStories: async (id: string) => {
    // If I used join, there would be a lot of redundant collection data fetched
    const [collection, stories] = await Promise.all([
      await collectionController.get(id),
      await itemController.getStoriesForCollection(id)
    ])
    return collection
      ? {
          ...collection,
          stories: stories.map(({ story_id }) => story_id)
        }
      : null
  },
  delete: async (id: string) => {
    return await dbClient('collections').delete().where({ id })
  }
}
