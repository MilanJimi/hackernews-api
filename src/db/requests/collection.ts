import { dbClient } from '../client'

type CollectionDb = {
  id: string
  owner_id: string
  name: string
}

const collectionColumns = [
  'collection.id',
  'collection.owner_id',
  'collection.name'
]

export const collectionController = {
  save: async (name: string, ownerId: string) =>
    dbClient('collections')
      .insert({ name, owner_id: ownerId })
      .returning<CollectionDb[]>(collectionColumns),
  update: async (id: string, name: string) =>
    dbClient('collections').where({ id }).update({ name }),
  get: async (ownerId: string, id: string) =>
    dbClient('collections')
      .select<CollectionDb[]>(collectionColumns)
      .where({ id, owner_id: ownerId }),
  delete: async (ownerId: string, id: string) =>
    dbClient('collections').delete().where({ owner_id: ownerId, id })
}
