const express = require("express");
const router = express.Router();
// const authClass = require('../auth/local')()

class OrderedItemRouter {
  constructor(orderedItemService) {
    this.orderedItemService = orderedItemService;
  }
  router() {
    router.get("/", this.get.bind(this));
    router.get("/orderHistory", this.listForCustomerProfile.bind(this));
    router.post("/", this.post.bind(this));
    router.put("/:id", this.put.bind(this));
    router.put("/changeStatus/:id", this.changeStatus.bind(this));
    router.delete("/:id", this.delete.bind(this));
    router.put("/refund/:id", this.refund.bind(this));
    return router;
  }
  get(req, res) {
    console.log("reaching get line19 orderitemrouter");
    let user = req.user;

    return this.orderedItemService.listForUser(user).then(data => {
      res.json(data);
    });
  }

  listForCustomerProfile(req, res) {
    let user_id = req.user;

    return this.orderedItemService
      .listForCustomerProfile(user_id)
      .then(data => res.json(data));
  }

  post(req, res) {
    console.log("post ()");
    let user = req.user;
    let order_content = req.body;
    // let order_id = req.params.order_id

    return this.orderedItemService.add(user, order_content).then(response => {
      console.log(" reaching .then in router--------->>>>><<<<<<");
      res.json(response);
    });
  }

  put(req, res) {
    console.log("put() router");

    let user = req.user;
    let change = req.body;
    let order_id = req.params.id;

    return this.orderedItemService
      .update(user, change, order_id)
      .then(data => {
        res.json(`${data} row modified`);
      })
      .catch(error => console.log(error));
  }

  delete(req, res) {
    let order_item_id = req.params.id;
    let remove = req.body;

    return this.orderedItemService
      .delete(order_item_id, remove)
      .then(data => {
        res.json(data);
      })
      .catch(error => console.log(error));
  }

  changeStatus(req, res) {
    let content = req.body;
    return this.orderedItemService.changeStatus(content).then(data => {
      res.json(data);
    });
  }

  refund(req, res) {
    let content = req.body;
    let user = req.user;
    let id = req.params.id
    console.log(id,'line86 oredere item router ===============');
    

    return this.orderedItemService.refund(user, content,id).then(data => {
      console.log("line 90 orderItem router");
      res.json(data);
    });
  }
}

module.exports = OrderedItemRouter;
