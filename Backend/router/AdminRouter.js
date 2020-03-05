const express = require('express')
const router = express.Router()

class AdminRouter {
  constructor (adminService) {
    this.adminService = adminService
  }
  router () {
    function is_admin (req, res, next) {
      if (req.user.is_admin !== true) {
        console.log('not admin')
        res.status(401).end()
      } else {
        console.log('real admin logging in')

        next()
      }
    }
    //================product=========================================//
    router.get('/product', is_admin, this.get.bind(this))
    router.post('/product', is_admin, this.post.bind(this))
    router.put('/product/:id', is_admin, this.put.bind(this))
    router.delete('/product/:id', is_admin, this.delete.bind(this))
    //================product=========================================//

    //================Chart=========================================//
    router.get(
      '/product/chartDataDay',
      is_admin,
      this.getChartDataDay.bind(this)
    )

    router.post(
      '/product/chartDataDay',
      is_admin,
      this.post_to_change_date.bind(this)
    )

    router.post(
      '/product/chartDataYear',
      is_admin,
      this.post_to_change_year.bind(this)
    )

    //================Chart=========================================//

    return router
  }

  getChartDataDay (req, res) {
    return this.adminService.getChartDataDay().then(data => {
      res.json(data)
    })
  }

  post_to_change_date (req, res) {
    let content = req.body
    return this.adminService.changeDate(content).then(data => {
      res.json(data)
    })
  }

  post_to_change_year (req, res) {
    let content = req.body
    return this.adminService.changeYear(content).then(data => {
      res.json(data)
    })
  }

  get (req, res) {
    let user = req.user
    return this.adminService
      .list(user)
      .then(data => {
        res.json(data)
      })
      .catch(err => res.status(500).json(err))
  }

  post (req, res) {
    let user = req.user
    let content = req.body
    return this.adminService
      .add(content)
      .then(data => {
        console.log('admin successfully added, sending back')

        res.send(data)
      })
      .catch(err => res.status(500).json(err))
  }

  put (req, res) {
    let user = req.user
    let product_id = req.params.id
    let content = req.body
    return this.adminService
      .edit(product_id, content)
      .then(data => {
        console.log('admin successfully edited, sending back')

        res.json(data)
      })
      .catch(err => res.status(500).json(err))
  }

  delete (req, res) {
    let product_id = req.params.id

    // let content = req.body
    return this.adminService
      .remove(product_id)
      .then(data => {
        console.log('admin successfully removed product, sending back')

        res.json(data)
      })
      .catch(err => res.status(500).json(err))
  }
}

module.exports = AdminRouter
