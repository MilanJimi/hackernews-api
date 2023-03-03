import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('stories', (t) => {
    // Different users can make snapshots at different times - so Hackernews ID is not unique
    t.uuid('id').primary().defaultTo(knex.raw('(uuid_generate_v4())'))
    t.integer('story_id').notNullable()
    t.uuid('collection_id')
      .references('collections.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .notNullable()
    // Not sure if string is sufficient, text to be safe
    t.text('title').notNullable()
    t.text('text')
    t.string('by').notNullable()
    t.integer('time').notNullable()
    t.string('url').notNullable()
    t.timestamps(true, true)
  })

  await knex.schema.createTable('comments', (t) => {
    t.uuid('id').primary().defaultTo(knex.raw('(uuid_generate_v4())'))
    t.integer('comment_id').notNullable()
    // To help fetching all comments relevant to a story
    t.uuid('root_story_id')
      .references('stories.id')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .notNullable()
    t.integer('parent').notNullable()
    t.string('by').notNullable()
    t.integer('time').notNullable()
    t.text('text').notNullable()
    t.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('comments')
  await knex.schema.dropTable('stories')
}
