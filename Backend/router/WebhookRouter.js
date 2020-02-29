const express = require('express')
const router = express.Router()


class WebhookRouter {
  constructor (webhookService, ) {
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
    console.log(req.body, 'bodyreq<===============')

    let event
    try {
      event = req.body
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`)
    }

    console.log(event)

    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object
        console.log('PaymentIntent was successful!')
        break
      case 'charge.succeeded':
        // const paymentIntent = event.data.object
        console.log('charge succeed was successful!!!!!!')
      
    
      
        return this.webhookService.changeStatus()
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
