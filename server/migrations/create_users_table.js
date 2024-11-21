exports.up = function (knex) {
    return knex.schema
    .createTable('users', (table) =>{
        table.bigIncrements('user_id').primary();
        table.string('username').notNullable();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
    })
    .createTable('destinations', (table) =>{
        table.bigIncrements('destination_id').primary();
        table.string('city_name').notNullable();
        table.string('country').notNullable();
    })
    .createTable('favorite_destinations', (table) =>{
        table.bigIncrements('fav_id').primary();
        table.string('user_id').notNullable().references('user_id').inTable('users');
        table.string('destination_id').notNullable().references('destination_id').inTable('destinations');
        table.timestamp('start_date').notNullable();
        table.timestamp('end_date').notNullable();
    });
}

exports.down = function(knex) {
    return knex.schema
        .droptableIfExists('users')
        .droptableIfExists('destinations')
        .droptableIfExists('favorite_destinations');
}