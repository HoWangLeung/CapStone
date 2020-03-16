const express = require("express");
const router = express.Router();

class CustomerInfoRouter {
  constructor(customerInfoService) {
    this.customerInfoService = customerInfoService;
  }
  router() {
    router.get("/", this.get.bind(this));
    router.post("/", this.post.bind(this));
    router.put("/", this.put.bind(this));
    return router;
  }

  get(req, res) {
    let user = req.user;
    return this.customerInfoService
      .list(user)
      .then(data => {
        console.log(
          data,
          "line20 info router ------>---->---->---->---->---->---->---->---->---->---->---->---->---->---->---->---->---->---->---->---->---->---->---->---->---->---->-->"
        );

        res.json(data);
      })
      .catch(err => res.status(500).json(err));
  }
  post(req, res) {
    let user = req.user;
    let content = req.body;
    return this.customerInfoService
      .add(user, content)
      .then(data => {
        console.log(data, "line28");

        res.json(data);
      })
      .catch(err => res.status(500).json(err));
  }

  put(req, res) {
    let user = req.user;
    let content = req.body;
    console.log(content);
    return this.customerInfoService
      .updateInfo(user, content)
      .then(data => {
        res.json(data);
      })
      .catch(error => console.log(error));
  }
}

module.exports = CustomerInfoRouter;
