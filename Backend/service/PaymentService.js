const stripe = require('stripe')('sk_test_VSPqZxwGfLXAyFZcc0HaAK8600zztVGOji')

class PaymentService {
  constructor (knex) {
    this.knex = knex
  }

  createPayment (user) {
    console.log(user.id)

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

    return query.then(data => {
      let grand_total = 0.0
      data.forEach(item => {
        let row_total = item.quantity * item.product_price
        grand_total += row_total
      })
      console.log(grand_total)
      console.log(data)

      console.log(
        "i'm trying to create a paymentIntent========================!!!!!!!!!!!!!!!!!!!!!!!!!"
      )

      return stripe.paymentIntents.create({
        amount: grand_total * 100,
        currency: 'hkd',
        payment_method_types: ['card']
      })
    })
  }
  insert_payment_ID (order_id, content, user) {
    // console.log(order_id, 'liine56 payment service')
    // console.log(content.paymentIntent.id, 'line59 paymentService')
    console.log(content,'line60-----------------------------paymentservice');
    
    let paymentIntent_id = content.paymentIntent.id

    let query = this.knex('order').where('order.id', order_id)

    return query.then(data => {
      console.log(data,'line67 paymentservice');
      
      return this.knex
      .select('order.paymentIntent_id')
      .from('order')
      .where('order.id', order_id)
      .update({
        paymentIntent_id: paymentIntent_id
      })
     
  
    })
  }

  changeStatus (order_id) {
    console.log('editing status')
    // return this.knex
    //   .select('order.status', 'pending')
    //   .from('order')
    //   .where('order.id', order_id)
    //   .update({
    //     status: 'paid'
    //   })
  }

  getOrderID () {}
}

module.exports = PaymentService
