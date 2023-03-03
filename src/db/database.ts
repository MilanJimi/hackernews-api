import { collectionController } from './requests/collection'
import { itemController } from './requests/item'
import { userController } from './requests/user'

export const db = {
  user: userController,
  collection: collectionController,
  item: itemController
}
