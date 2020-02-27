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
      let grand_total = 0
      data.forEach(item => {
        let row_total = item.quantity * item.product_price
        grand_total += row_total
      })
      console.log(grand_total)

      console.log("i'm trying to create a paymentIntent")

      return stripe.paymentIntents.create({
        amount: grand_total,
        currency: 'hkd',
        payment_method_types: ['card']
      })
    })
  }

  async confirmPayment (req_body) {
    let event
    // console.log(req.headers,'header');

    try {
      event = req_body.result.paymentIntent
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`)
    }

    console.log(event, 'event=================>')

    switch (event.status) {
      case 'succeeded':
        const paymentIntent = event
        console.log('PaymentIntent was successful!', event.id)
        console.log('running')
        const intent = await stripe.paymentIntents.retrieve(event.id)
        const charges = intent.charges.data
        console.log(charges, '<<<<<<<<<<<<<<<<============charges')
        break
      case 'payment_failed':
        const paymentMethod = event.data.object
        console.log('PaymentMethod was attached to a Customer!')
        break
      // ... handle other event types
      default:
        // Unexpected event type
        return res.status(400).end()
    }
  }
}

module.exports = PaymentService
