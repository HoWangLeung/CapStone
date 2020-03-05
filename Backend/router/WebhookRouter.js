const express = require('express')
const router = express.Router()

class WebhookRouter {
  constructor (webhookService) {
    this.webhookService = webhookService
  }
  router () {
    router.get('/', this.get.bind(this))
    router.post('/', this.post.bind(this))
    return router
  }

  get (req, res) {}

  post (req, res) {
    console.log('post received')

    let event
    try {
      event = req.body
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`)
    }

    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object
        console.log('PaymentIntent was successful!')
        break
      case 'charge.succeeded':
        // const paymentIntent = event.data.object
        console.log(
          '<<<<<<<<<<<<<<<================================================>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>'
        )
        console.log(event, 'line36 webhook router')
        console.log('charge succeed was successful!!!!!!')

        console.log(event.data.object.payment_intent)
        let paymentIntent_id = event.data.object.payment_intent
        return this.webhookService.changeStatus(paymentIntent_id).then(data => {
          console.log('line41 webhook router====================================================================')

          

          res.json(data)
        })

        break
      case 'payment_intent.created':
        // const paymentIntent = event.data.object
        console.log('payment_intent.created was successful!')
        break
      //   case 'payment_method.attached':
      //     // const paymentMethod = event.data.object
      //     console.log('PaymentMethod was attached to a Customer!')
      //     break
      // ... handle other event types
      default:
        // Unexpected event type
        return res.status(400).end()
    }
    // Return a 200 res to acknowledge receipt of the event
    res.json({ received: true })
  }
}

module.exports = WebhookRouter
