import { collectionController } from './requests/collection'
import { userController } from './requests/user'

export const db = {
  user: userController,
  collection: collectionController
}
