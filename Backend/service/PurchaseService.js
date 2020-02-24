class PurchaseService {
  constructor (knex) {
    this.knex = knex
  }

  list () {
    let query = this.knex.from('purchase')

    return query.then(rows => {
      return rows
    })
  }

  add (user, order) {
    console.log('add()');
    
    let query = this.knex
      .select('id')
      .from('users')
      // .innerJoin('orders','users.id', 'orders.user_id')
      .where('users.id', user.id)
    return query.then(rows => {
      if (rows.length === 1) {
        console.log('reaching 1');
        console.log(order);
        
        return this.knex
          .insert({
            user_id:order.user_id,
            product_id: order.product_id,
            quantity: order.quantity,
            product_size: order.product_size,
            product_milk:order.product_milk,
            product_temperature: order.product_temperature,
            special_instruction: order.special_instruction,
            status: order.status
          })
          .into('purchase')
      } else {
        throw new Error('Cannot add a note to a user that doesnt exist')
      }
    })
  }
}
module.exports = PurchaseService
