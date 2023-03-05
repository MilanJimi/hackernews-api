const integrationModule = jest.requireActual<
  typeof import('../hackernewsIntegration')
>('../hackernewsIntegration')

export const mockStories = [
  {
    by: 'mayoff',
    descendants: 31,
    id: 2921506,
    kids: [2921983, 2921875],
    score: 226,
    time: 1314205301,
    title:
      'Peter Norvig on a 45-year-old article about a checkers-playing program',
    type: 'story' as const,
    url: 'http://blogs.scientificamerican.com/at-scientific-american/2011/08/23/systems-analysis-look-back-1966-scientific-american-article/'
  }
]

export const mockComments = [
  {
    by: 'norvig',
    id: 2921983,
    kids: [2922573, 2922140, 2922097],
    parent: 2921506,
    text: "Aw shucks, guys ... you make me blush with your compliments.<p>Tell you what, Ill make a deal: I'll keep writing if you keep reading. K?",
    time: 1314211127,
    type: 'comment' as const
  },
  {
    by: 'sgoranson',
    id: 2922573,
    parent: 2921983,
    text: "sounds like you had a pretty awesome attic growing up! all I had was my sister's old REO Speedwagon LPs",
    time: 1314221734,
    type: 'comment' as const
  },
  {
    by: 'cema',
    id: 2922140,
    parent: 2921983,
    text: "It's a deal!",
    time: 1314213578,
    type: 'comment' as const
  },
  {
    by: 'pchristensen',
    id: 2922097,
    kids: [2923189],
    parent: 2921983,
    text: 'Deal.',
    time: 1314213033,
    type: 'comment' as const
  },
  {
    by: 'norvig',
    id: 2923189,
    parent: 2922097,
    text: 'Promise.',
    time: 1314230753,
    type: 'comment' as const
  },
  {
    by: 'nato1138',
    dead: true,
    id: 2921875,
    parent: 2921506,
    text: 'I just bumped into this in Godel, Escher, Bach -- it has some great insights into the deeper solution of this program.',
    time: 1314209674,
    type: 'comment' as const
  }
]

const mockItems = [...mockStories, ...mockComments]

const getSingleItem = jest
  .spyOn(integrationModule, 'getSingleItem')
  .mockImplementation(async (id: number) => {
    return mockItems.find((item) => item.id === id) ?? null
  })

const { hackernewsIntegration } = jest.requireActual<
  typeof import('../hackernewsIntegration')
>('../hackernewsIntegration')

export { hackernewsIntegration, getSingleItem }
