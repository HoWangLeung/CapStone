const express = require('express')
const router = express.Router()
// const authClass = require('../auth/local')()

class PurchaseRouter {
  constructor (purchasService) {
    this.purchasService = purchasService
  }
  router () {
    router.get('/', this.get.bind(this))
    router.post('/', this.post.bind(this))
    return router
  }
  get (req, res) {
    console.log('reaching get')

    return this.purchasService.list().then(data => {
      res.json(data)
    })
  }

  post (req, res) {
    console.log('post ()')
    let user = req.user
    let order = req.body

    return this.purchasService.add(user, order).then(data => {
      res.json(data)
    })
  }
}

module.exports = PurchaseRouter
