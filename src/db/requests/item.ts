import {
  HackernewsCommentDTO,
  HackernewsStoryDTO
} from 'src/integrations/hackernews/hackernewsIntegration'

import { dbClient } from '../client'

type StoryDB = {
  id: string
  story_id: number
  collection_id: string
  title: string
  text?: string
  by: string
  time: number
  url: string
}
type CommentDB = {
  id: string
  comment_id: number
  root_story_id: string
  parent: number
  text: string
  by: string
  time: number
}
const storyColumns = [
  'stories.id',
  'stories.story_id',
  'stories.collection_id',
  'stories.title',
  'stories.text',
  'stories.by',
  'stories.time',
  'stories.url'
]

const commentColumns = [
  'comments.id',
  'comments.comment_id',
  'comments.root_story_id',
  'comments.parent',
  'comments.text',
  'comments.by',
  'comments.time'
]

const getCommentsForStory = async (rootStoryId: string) => {
  return await dbClient('comments')
    .select<CommentDB[]>(commentColumns)
    .where({ root_story_id: rootStoryId })
}
export const itemController = {
  saveComment: async (
    rootStoryId: string,
    { id, by, time, text, parent }: HackernewsCommentDTO
  ) => {
    return await dbClient('comments')
      .insert({
        root_story_id: rootStoryId,
        comment_id: id,
        by,
        time,
        text,
        parent
      })
      .returning<{ id: string }[]>('id')
  },
  saveStory: async (
    collectionId: string,
    { id, by, time, text, title, url }: HackernewsStoryDTO
  ) => {
    return await dbClient('stories')
      .insert({
        story_id: id,
        collection_id: collectionId,
        by,
        time,
        text,
        url,
        title
      })
      .returning<{ id: string }[]>('id')
  },
  getStoriesForCollection: async (collectionId: string) => {
    return await dbClient('stories')
      .select<StoryDB[]>(storyColumns)
      .where({ collection_id: collectionId })
  },
  getStoryWithComments: async (collectionId: string, storyId: number) => {
    const story = await dbClient('stories')
      .select<StoryDB>(storyColumns)
      .where({ collection_id: collectionId, story_id: storyId })
      .first()
    if (!story) return null
    const comments = await getCommentsForStory(story.id)
    return { ...story, comments }
  }
}
