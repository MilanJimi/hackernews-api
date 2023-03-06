export const mockDbStories = [
  {
    id: 'b96dd14c-5c6d-41a2-960f-1b91c3c5b7a4',
    story_id: 8863,
    collection_id: 'bf44413c-7ed5-4036-b497-b3ebb9480abe',
    by: 'mayoff',
    time: 1314205301,
    title:
      'Peter Norvig on a 45-year-old article about a checkers-playing program',
    text: null,
    url: 'http://blogs.scientificamerican.com/at-scientific-american/2011/08/23/systems-analysis-look-back-1966-scientific-american-article/'
  }
]

export const mockDbComments = [
  {
    id: 'c7dc67dd-fa72-452b-81a8-064f306d1e98',
    comment_id: 2921983,
    root_story_id: 'b96dd14c-5c6d-41a2-960f-1b91c3c5b7a4',
    by: 'norvig',
    parent: 2921506,
    text: "Aw shucks, guys ... you make me blush with your compliments.<p>Tell you what, Ill make a deal: I'll keep writing if you keep reading. K?",
    time: 1314211127
  },
  {
    id: 'a6e1dbdb-2722-4d0d-b756-6bff4ab9a38c',
    by: 'sgoranson',
    comment_id: 2922573,
    root_story_id: 'b96dd14c-5c6d-41a2-960f-1b91c3c5b7a4',
    parent: 2921983,
    text: "sounds like you had a pretty awesome attic growing up! all I had was my sister's old REO Speedwagon LPs",
    time: 1314221734
  },
  {
    by: 'cema',
    comment_id: 2922140,
    root_story_id: 'b96dd14c-5c6d-41a2-960f-1b91c3c5b7a4',
    parent: 2921983,
    text: "It's a deal!",
    time: 1314213578
  },
  {
    id: 'fe1b87a4-a684-4fad-ac7f-699bbb7501cc',
    by: 'pchristensen',
    comment_id: 2922097,
    root_story_id: 'b96dd14c-5c6d-41a2-960f-1b91c3c5b7a4',
    parent: 2921983,
    text: 'Deal.',
    time: 1314213033
  },
  {
    id: 'd2ee0951-d262-4540-8c3a-56cd850222c7',
    by: 'norvig',
    comment_id: 2923189,
    root_story_id: 'b96dd14c-5c6d-41a2-960f-1b91c3c5b7a4',
    parent: 2922097,
    text: 'Promise.',
    time: 1314230753
  },
  {
    id: '1b213977-1a17-4623-a2f1-b63866553732',
    by: 'nato1138',
    comment_id: 2921875,
    root_story_id: 'b96dd14c-5c6d-41a2-960f-1b91c3c5b7a4',
    parent: 2921506,
    text: 'I just bumped into this in Godel, Escher, Bach -- it has some great insights into the deeper solution of this program.',
    time: 1314209674
  }
]

const { itemController } =
  jest.createMockFromModule<typeof import('../item')>('../item')

itemController.saveStory = jest
  .fn()
  .mockReturnValue([{ id: '80824072-2728-41b5-a463-32b2a374a561' }])

itemController.getStoriesForCollection = jest
  .fn()
  .mockImplementation((collectionId) =>
    mockDbStories.filter(({ collection_id }) => collection_id === collectionId)
  )
itemController.getStoryWithComments = jest
  .fn()
  .mockImplementation((collectionId, storyId) => {
    const story = mockDbStories.find(
      ({ collection_id }) => collection_id === collectionId
    )
    return {
      ...story,
      comments: mockDbComments.filter(
        ({ root_story_id }) => story && root_story_id === story.id
      )
    }
  })

export { itemController }
