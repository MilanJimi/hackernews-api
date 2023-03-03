import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('collections', (t) => {
    t.uuid('id').primary().defaultTo(knex.raw('(uuid_generate_v4())'))
    t.uuid('owner_id').references('users.id').onUpdate('CASCADE').notNullable()
    t.string('name').notNullable()
    t.timestamps(true, true)
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('collections')
}
