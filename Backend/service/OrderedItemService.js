class OrderedItemService {
  constructor (knex) {
    this.knex = knex
  }

  listForAdmin (id) {
    console.log('listforadmin line8')
    console.log(id)

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
      .where('order.status', 'pending')
      .where('order.id', id)
      .innerJoin('ordered_item', 'ordered_item.order_id', 'order.id')
      .innerJoin('product', 'product.id', 'ordered_item.product_id')
      .orderBy('order.id', 'asc')

    return query.then(rows => {
      console.log(rows)

      return rows
    })
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
        'ordered_item.price',
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
      .orderBy('ordered_item.id', 'asc')

    return query.then(rows => {
      console.log(rows)

      return rows
    })
  }

  add (user, order_content) {
    console.log(order_content, '========================order_content')

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
      console.log(data.length, 'datalength=======================')

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
                special_instruction: order_content.special_instruction,
                price: order_content.product_price
              })
              .into('ordered_item')
          })
      } else {
        console.log('else')
        let query = this.knex('order').where('order.user_id', user.id)

        query.then(data => {
          console.log(data, 'line123 orderitem service')

          return this.knex
            .insert({
              product_id: order_content.product_id,
              order_id: data.slice(-1)[0].id,
              quantity: order_content.quantity,
              product_size: order_content.product_size,
              product_milk: order_content.product_milk,
              product_temperature: order_content.product_temperature,
              special_instruction: order_content.special_instruction,
              price: order_content.product_price
            })
            .into('ordered_item')
        })
      }
    })
  }

  update (user, change, ordered_item_id) {
    console.log(ordered_item_id, 'sfsdfsdfsdfsdfsfsfsdfsdsfsdfsdfsdfsdfds')
    console.log(change)

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
        quantity: change.quantity,
        product_temperature: change.product_temperature,
        product_milk: change.product_temperature,
        product_size:change.product_size,
        special_instruction: change.special_instruction
      })
      
  }

  delete (order_item_id, remove) {
    console.log(order_item_id)
    console.log(remove)
    console.log('removing')

    let query = this.knex
      .select(
        'order.id as orderID',
        'ordered_item.id as ordered_item_id',
        'order.status'
      )
      .from('ordered_item')
      // .where('ordered_item.id', order_item_id)
      .innerJoin('order', 'order.id', 'ordered_item.order_id')
      .where('order.status', 'pending')
    return query.then(data => {
      if (data.length > 1) {
        return this.knex('ordered_item')
          .where('ordered_item.id', order_item_id)
          .del()
      } else if (data.length === 1) {
        console.log(
          'attempting to delete the last item in cart <====================='
        )
        return this.knex('ordered_item')
          .where('ordered_item.id', order_item_id)
          .del()
          .then(() => {
            return this.knex('order')
              .where('order.status', 'pending')
              .del()
          })
      }
    })
  }

  changeStatus (content) {}
}
module.exports = OrderedItemService
