import axios from 'axios'
import { ErrorCode } from '../../API/errors/enums'
import { UserFacingError } from '../../API/errors/error'
import { config } from '../../config/config'

type BaseHackernewsResponseDTO = {
  id: number
  deleted?: boolean
  dead?: boolean
  kids?: number[]
  text?: string
  by: string
  time: number
}

export type HackernewsStoryDTO = BaseHackernewsResponseDTO & {
  type: 'story'
  descendants: number
  url: string
  title: string
  score: number
}
export type HackernewsCommentDTO = BaseHackernewsResponseDTO & {
  type: 'comment'
  text: string
  parent: number
}

const getSingleItem = async (id: number) => {
  const item = await axios.get<HackernewsStoryDTO | HackernewsCommentDTO>(
    `${config.hackernewsHost}/v0/item/${id}.json`
  )
  return item.data
}

export const hackernewsIntegration = {
  getStory: async (id: number) => {
    const story = await getSingleItem(id)
    if (story.type !== 'story')
      throw new UserFacingError(ErrorCode.typeMismatch)
    return story
  },
  getComment: async (id: number) => {
    const comment = await getSingleItem(id)
    if (comment.type !== 'comment')
      throw new UserFacingError(ErrorCode.typeMismatch)
    return comment
  }
}
