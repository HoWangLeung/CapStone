class OrderedItemService {
  constructor (knex) {
    this.knex = knex
  }

  listForUser (user) {
    let query = this.knex
      .select(
        'order.id as orderID',
        'order.user_id',
        'order.status',
        'ordered_item.id as orderItemID',
        'ordered_item.product_id',
        'ordered_item.quantity',
        'ordered_item.product_size',
        'ordered_item.product_milk',
        'ordered_item.product_temperature',
        'ordered_item.special_instruction',
        'product.genre_id',
        'product.product_name',
        'product.product_img',
        'product.product_cost',
        'product.product_price',
        'available_period'
      )
      .from('order')
      .where('order.user_id', user.id)
      .where('order.status', 'pending')
      .innerJoin('ordered_item', 'ordered_item.order_id', 'order.id')
      .innerJoin('product', 'product.id', 'ordered_item.product_id')
      .orderBy('order.id', 'asc')

    return query.then(rows => {
      // console.log(rows)

      return rows
    })
  }

  add (user, order_content) {
    let query = this.knex
      .select('users.id as users_id', 'order.id as order_id', 'order.status')
      .from('users')

      .where('users.id', user.id)
      .innerJoin('order', 'order.user_id', 'users.id')
      .where('order.status', 'pending')

    return query.then(data => {
      console.log(
        data,
        '----------------------==================================='
      )
      console.log(user.id)
      console.log(data.length, 'datalength')

      if (data.length === 0) {
        return this.knex
          .insert({
            user_id: user.id,
            status: 'pending'
          })
          .into('order')
          .returning('id')
          .then(id => {
            // console.log(order_content)
            console.log(id[0], 'the order id')

            return this.knex
              .insert({
                product_id: order_content.product_id,
                order_id: id[0],
                quantity: order_content.quantity,
                product_size: order_content.product_size,
                product_milk: order_content.product_milk,
                product_temperature: order_content.product_temperature,
                special_instruction: order_content.special_instruction
              })
              .into('ordered_item')
          })
      } else {
        console.log('else')
        let query = this.knex('order').where('order.user_id', user.id)

        query.then(data => {
          return this.knex
            .insert({
              product_id: order_content.product_id,
              order_id: data[0].id,
              quantity: order_content.quantity,
              product_size: order_content.product_size,
              product_milk: order_content.product_milk,
              product_temperature: order_content.product_temperature,
              special_instruction: order_content.special_instruction
            })
            .into('ordered_item')
        })
      }
    })
  }
  // return query.then(user => {
  //   console.log(user, '<=================user')

  //   if (user.length === 1) {
  //     let order_query = this.knex
  //       .select('order.id', 'order.status')
  //       .from('order')
  //       .where('status', 'pending')

  //     order_query.then(order_rows => {
  //       if (order_rows.length > 0) {
  //         console.log(order_rows, 'line 68===')
  //         console.log('after first insert ,can only insert one pending')

  //         return this.knex
  //           .insert({
  //             product_id: order_content.product_id,
  //             order_id: order_rows[0].id,
  //             quantity: order_content.quantity,
  //             product_size: order_content.product_size,
  //             product_milk: order_content.product_milk,
  //             product_temperature: order_content.product_temperature,
  //             special_instruction: order_content.special_instruction
  //           })
  //           .into('ordered_item')
  //       } else {
  //         console.log('first insert')
  //         console.log(order_rows, 'line94========')
  //         return this.knex
  //           .insert({
  //             user_id: user[0].users_id,
  //             status: 'pending'
  //           })
  //           .returning('id')
  //           .into('order')
  //           .then(id => {
  //             console.log(id, 'line91')

  //             return this.knex
  //               .insert({
  // product_id: order_content.product_id,
  // order_id: id[0],
  // quantity: order_content.quantity,
  // product_size: order_content.product_size,
  // product_milk: order_content.product_milk,
  // product_temperature: order_content.product_temperature,
  // special_instruction: order_content.special_instruction
  //               })
  //               .into('ordered_item')
  //           })
  //       }
  //     })
  //   } else {
  //     throw new Error('Cannot add an order to a user that doesnt exist')
  //   }
  // })

  update (user, change, ordered_item_id) {
    console.log(ordered_item_id, 'sfsdfsdfsdfsdfsfsfsdfsdsfsdfsdfsdfsdfds')

    return this.knex
      .select(
        'ordered_item.id',
        'ordered_item.product_id',
        'ordered_item.quantity',
        'ordered_item.product_size',
        'ordered_item.product_milk',
        'ordered_item.product_temperature',
        'ordered_item.special_instruction'
      )
      .from('ordered_item')
      .where('ordered_item.id', ordered_item_id)
      .update({
        quantity: change.quantity
      })
  }

  delete (order_item_id, remove) {
    console.log(order_item_id)
    console.log(remove)

    return this.knex('ordered_item')
      .where('ordered_item.id', order_item_id)
      .del()
  }
}
module.exports = OrderedItemService
