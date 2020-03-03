const express = require('express')
const router = express.Router()
// const authClass = require('../auth/local')()

class OrderedItemRouter {
  constructor (orderedItemService) {
    this.orderedItemService = orderedItemService
  }
  router () {
    router.get('/', this.get.bind(this))
    router.get('/:id', this.getForAdmin.bind(this))
    router.post('/', this.post.bind(this))
    router.put('/:id', this.put.bind(this))
    router.put('/changeStatus/:id', this.changeStatus.bind(this))
    router.delete('/:id', this.delete.bind(this))
    return router
  }
  get (req, res) {
    console.log('reaching get')
    let user = req.user

    return this.orderedItemService.listForUser(user).then(data => {
      res.json(data)
    })
  }

  getForAdmin (req, res) {
    console.log(req.params.id)
    let id = req.params.id

    return this.orderedItemService.listForAdmin(id).then(data => res.json(data))
  }

  post (req, res) {
    console.log('post ()')
    let user = req.user
    let order_content = req.body
    // let order_id = req.params.order_id

    return this.orderedItemService.add(user, order_content).then(response => {
      console.log(' reaching .then in router--------->>>>><<<<<<')

      res.json(response)
    })
  }

  put (req, res) {
    console.log('put() router')

    let user = req.user
    let change = req.body
    let order_id = req.params.id

    return this.orderedItemService
      .update(user, change, order_id)
      .then(data => {
        res.json(`${data} row modified`)
      })
      .catch(error => console.log(error))
  }

  delete (req, res) {
    let order_item_id = req.params.id
    let remove = req.body

    return this.orderedItemService
      .delete(order_item_id, remove)
      .then(data => {
        res.json(data)
      })
      .catch(error => console.log(error))
  }

  changeStatus (req, res) {
    let content = req.body
    return this.orderedItemService.changeStatus(content)
    .then((data)=>{
      res.json(data)
    })
  }
}

module.exports = OrderedItemRouter
