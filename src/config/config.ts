import dotenv from 'dotenv'
dotenv.config()

export const assertIsDefined: <T>(
  val: T,
  name: string
) => asserts val is NonNullable<T> = (val, name) => {
  if (val === undefined || val === null) {
    throw new Error(`Expected '${name}' to be defined, but received ${val}`)
  }
}

const getConfig = () => {
  assertIsDefined(process.env.PORT, 'PORT')
  assertIsDefined(process.env.ACCESS_TOKEN_SECRET, 'ACCESS_TOKEN_SECRET')
  assertIsDefined(process.env.REFRESH_TOKEN_SECRET, 'REFRESH_TOKEN_SECRET')
  assertIsDefined(process.env.POSTGRES_USER, 'POSTGRES_USER')
  assertIsDefined(process.env.POSTGRES_DB, 'POSTGRES_DB')
  assertIsDefined(process.env.POSTGRES_HOST, 'POSTGRES_HOST')
  assertIsDefined(process.env.POSTGRES_PASSWORD, 'POSTGRES_PASSWORD')
  assertIsDefined(process.env.HACKERNEWS_HOST, 'HACKERNEWS_HOST')
  return {
    port: process.env.PORT,
    hackernewsHost: process.env.HACKERNEWS_HOST,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    dbConnectionString: `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}/${process.env.POSTGRES_DB}`
  }
}

const config = getConfig()

export { config }
