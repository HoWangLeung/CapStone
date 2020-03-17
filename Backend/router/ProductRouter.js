const express = require("express");
const router = express.Router();

class ProductRouter {
  constructor(productService) {
    this.productService = productService;
  }
  router() {
    router.get("/", this.get.bind(this));
    router.post("/", this.post.bind(this));
    return router;
  }

  get(req, res) {
    return this.productService
      .list()
      .then(data => {
        res.json(data);
      })
      .catch(err => res.status(500).json(err));
  }
  post(req, res) {
    return this.productService
      .add()
      .then(data => {
        res.json(data);
      })
      .catch(err => res.status(500).json(err));
  }
}

module.exports = ProductRouter;
