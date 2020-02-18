
exports.up = function(knex) {
  return knex.schema
      .createTable('genre', table => {
        table.increments()
        table.string('genre_name')
        table.string('genre_img')
        table.string('description')
        table.timestamps(false, true)
      })
      .createTable('product', table => {
        table.increments()
        table.integer('genre_id')
        table.foreign('genre_id').references('genre.id')
        table.string('product_name')
        table.string('product_img')
        table.integer('product_cost')
        table.integer('product_price')
        table.string('available_period')
        table.timestamps(false, true)
      })
  
};

exports.down = function(knex) {
    return knex.schema.dropTable("product").dropTable("genre")

};
