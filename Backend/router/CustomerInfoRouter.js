const express = require('express')
const router = express.Router()

class CustomerInfoRouter {
  constructor (customerInfoService) {
    this.customerInfoService = customerInfoService
  }
  router () {
    router.get('/', this.get.bind(this))
    router.post('/', this.post.bind(this))
    return router
  }

  get (req, res) {
    let user = req.user
    return this.customerInfoService
      .list(user)
      .then(data => {
        res.json(data)
      })
      .catch(err => res.status(500).json(err))
  }
  post (req, res) {
      let user = req.user
      let content = req.body
    return this.customerInfoService
      .add(user, content)
      .then(data => {
        console.log(data,'line28');
        
        res.json(data)
      })
      .catch(err => res.status(500).json(err))
  }
}

module.exports = CustomerInfoRouter
