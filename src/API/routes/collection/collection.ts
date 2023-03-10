import express from 'express'
import { catchExceptions } from '../../errors/errorHandler'

import { authenticate } from '../../middleware/authenticate'
import {
  handleAddToCollection,
  handleDeleteCollection,
  handleGetCollection,
  handleGetStory,
  handleNewCollection,
  handleUpdateCollection
} from './handlers'

const collectionRouter = express()
collectionRouter.use(authenticate)

collectionRouter.post('/new', catchExceptions(handleNewCollection))
collectionRouter.get('/:id', catchExceptions(handleGetCollection))
collectionRouter.get('/:collectionId/:storyId', catchExceptions(handleGetStory))
collectionRouter.patch('/:id', catchExceptions(handleUpdateCollection))
collectionRouter.delete('/:id', catchExceptions(handleDeleteCollection))
collectionRouter.post('/:id/add', catchExceptions(handleAddToCollection))

export { collectionRouter }
