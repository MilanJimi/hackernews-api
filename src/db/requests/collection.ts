import { dbClient } from '../client'

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
  },
  delete: async (id: string) => {
    return await dbClient('collections').delete().where({ id })
  }
}
