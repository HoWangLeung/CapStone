const express = require('express')
const router = express.Router()
require('dotenv').config()
const bodyParser = require('body-parser')
const stripe = require('stripe')('sk_test_VSPqZxwGfLXAyFZcc0HaAK8600zztVGOji')

class PaymentRouter {
  constructor (paymentService) {
    this.paymentService = paymentService
  }
  router () {
    router.get('/public-key', this.get.bind(this))
    router.post('/create-payment-intent', this.post.bind(this))
    router.put('/order/:id', this.put.bind(this))
    return router
  }

  get (req, res) {
    console.log(process.env.STRIPE_PUBLISHABLE_KEY, '=>key')

    res.send({
      publicKey: process.env.STRIPE_PUBLISHABLE_KEY
    })
  }
  post (req, res) {
    console.log(req.body, 'dsfsdfsdfsdfsdf')
    console.log(req.user, 'user')
    let user = req.user

    return this.paymentService
      .createPayment(user)
      .then(paymentIntentResponse => {
        console.log('payment_intent Created')
        console.log(paymentIntentResponse)

        console.log(paymentIntentResponse.client_secret)
        let client_secret = paymentIntentResponse.client_secret
        res.send(client_secret)
      })
  }
  put (req, res) {
    let order_ID = req.params.id
    let content = req.body
    return this.paymentService.changeStatus(content, order_ID).then(data => {
      res.json(data)
    })
  }
}

module.exports = PaymentRouter
