import knex from 'knex'
import { config } from '../config/config'

export const dbConfig = {
  client: 'pg',
  connection: config.dbConnectionString,
  pool: { min: 0, max: 19 },
  migrations: {
    directory: './migrations'
  }
}

export const dbClient = knex(dbConfig)
