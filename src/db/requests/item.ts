import {
  HackernewsCommentDTO,
  HackernewsStoryDTO
} from 'src/integrations/hackernews/hackernewsIntegration'

import { dbClient } from '../client'

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
  }
}
