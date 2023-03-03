import express from 'express'
import { catchExceptions } from '../../errors/errorHandler'

import { authenticate } from '../../middleware/authenticate'
import {
  handleAddToCollection,
  handleDeleteCollection,
  handleGetCollection,
  handleNewCollection,
  handleUpdateCollection
} from './handlers'

const collectionRouter = express()
collectionRouter.use(authenticate)

collectionRouter.post('/new', catchExceptions(handleNewCollection))
collectionRouter.get('/:id', catchExceptions(handleGetCollection))
collectionRouter.put('/:id', catchExceptions(handleUpdateCollection))
collectionRouter.delete('/:id', catchExceptions(handleDeleteCollection))
collectionRouter.post(
  '/:collectionId/add/:storyId',
  catchExceptions(handleAddToCollection)
)

export { collectionRouter }
