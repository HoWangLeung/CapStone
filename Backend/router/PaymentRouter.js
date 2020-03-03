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
    router.post('/order/:id', this.post_to_insert_payment_ID.bind(this))
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
    let user = req.user

    return this.paymentService
      .createPayment(user)
      .then(paymentIntentResponse => {
        console.log(paymentIntentResponse.client_secret)
        let client_secret = paymentIntentResponse.client_secret
        res.send(client_secret)
      })
  }
  post_to_insert_payment_ID (req, res) {
    let order_id = req.params.id
    let content = req.body
    let user = req.user

    return this.paymentService
      .insert_payment_ID(order_id, content,user)
      .then(data => {
        res.json(data)
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
