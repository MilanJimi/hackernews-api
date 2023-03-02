import { db } from 'src/db/database'

export const collectionService = {
  get: (userId: string, id: string) => db.collection.get(userId, id),
  update: (id: string, name: string) => db.collection.update(id, name),
  new: (userId: string, name: string) => db.collection.save(userId, name),
  delete: (userId: string, id: string) => db.collection.delete(userId, id)
}
