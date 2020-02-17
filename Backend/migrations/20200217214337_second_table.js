
exports.up = function(knex) {
  return knex.schema
  .createTable('order', table => {
    table.increments()
    table.string('user_id')
    table.foreign('user_id').reference('customer.user_id')
    table.timestamps(false, true)
  })
  .createTable('shoppingCart', table => {
    table.increments()
    table.string("order_id")
    table.string("product_id")
    table.integer('quantity')
    table.string('product_size')
    table.string("product_milk")
    table.string("product_temperature")
    table.string("special_instruction")
    

  })
  .createTable('displayMenu', table => {
    table.increments()
    table.string('product_id')
    table.foreign('product_id').reference('product.id')
  
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable("order").dropTable("shoppingCart").dropTable("displayMenu")

};
