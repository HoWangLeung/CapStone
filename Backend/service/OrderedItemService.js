class OrderedItemService {
  constructor(knex) {
    this.knex = knex;
  }

  listForCustomerProfile(user_id) {
    console.log("listForCustomerProfile line8");
    console.log(user_id, "line 8 orderitems service -------->");

    let query = this.knex
      .select(
        "order.id as orderID",
        "order.user_id",
        "order.status",
        this.knex.raw(
          "to_char(ordered_item.created_at, 'DD/MM/YYYY HH24:MI') as orderedItem_created_at"
        ),
        "ordered_item.id as orderItemID",
        "ordered_item.product_id",
        "ordered_item.quantity",
        "ordered_item.product_size",
        "ordered_item.product_milk",
        "ordered_item.product_temperature",
        "ordered_item.special_instruction",
        "product.genre_id",
        "product.product_name",
        "product.product_img",
        "product.product_cost",
        "product.product_price",
        "available_period",
        "ordered_item.ordered_item_status as ordered_item_status"
      )
      .from("order")
      .where("order.user_id", user_id.id)
      .whereNot("order.status", "pending")

      .innerJoin("ordered_item", "ordered_item.order_id", "order.id")
      .whereNot("ordered_item.ordered_item_status", "pending")
      .innerJoin("product", "product.id", "ordered_item.product_id")
      .orderBy("order.id", "asc");

    return query.then(rows => {
      console.log(
        rows,
        "line42====================================================="
      );

      return rows;
    });
  }

  listForUser(user) {
    let query = this.knex
      .select(
        "order.id as orderID",
        "order.user_id",
        "order.status",
        "ordered_item.id as orderItemID",
        "ordered_item.product_id",
        "ordered_item.quantity",
        "ordered_item.product_size",
        "ordered_item.product_milk",
        "ordered_item.product_temperature",
        "ordered_item.special_instruction",
        this.knex.raw(
          "to_char(ordered_item.created_at, 'DD/MM/YYYY HH24:MI') as created_at"
        ),
        "ordered_item.price",
        "product.genre_id",
        "product.product_name",
        "product.product_img",
        "product.product_cost",
        "product.product_price",
        "available_period"
      )
      .from("order")
      .where("order.user_id", user.id)
      .where("order.status", "pending")
      .innerJoin("ordered_item", "ordered_item.order_id", "order.id")
      .innerJoin("product", "product.id", "ordered_item.product_id")
      .orderBy("ordered_item.id", "asc");

    return query.then(rows => {
      console.log(rows);

      return rows;
    });
  }

  add(user, order_content) {
    if (order_content.product_size === "medium") {
      console.log("this product +=4");
      order_content.product_price += 4;
    } else if (order_content.product_size === "large") {
      order_content.product_price += 8;
    } else {
      console.log("nothing happens");
    }

    console.log(order_content, "========================order_content");

    let query = this.knex
      .select("users.id as users_id", "order.id as order_id", "order.status")
      .from("users")
      .where("users.id", user.id)
      .innerJoin("order", "order.user_id", "users.id")
      .where("order.status", "pending");

    return query.then(data => {
      console.log(
        data,
        "----------------------==================================="
      );
      console.log(user.id);
      console.log(data.length, "datalength=======================");

      if (data.length === 0) {
        return this.knex
          .insert({
            user_id: user.id,
            status: "pending"
          })
          .into("order")
          .returning("id")
          .then(id => {
            // console.log(order_content)
            console.log(id[0], "the order id");

            return this.knex
              .insert({
                product_id: order_content.product_id,
                order_id: id[0],
                quantity: order_content.quantity,
                product_size: order_content.product_size,
                product_milk: order_content.product_milk,
                product_temperature: order_content.product_temperature,
                special_instruction: order_content.special_instruction,
                price: order_content.product_price,
                fixed_cost: order_content.fixed_cost
              })
              .into("ordered_item");
          });
      } else {
        console.log("else");
        let query = this.knex("order")
          .where("order.user_id", user.id)
          .orderBy("order.id", "asc");

        query.then(data => {
          console.log(data, "line123 orderitem service");

          return this.knex
            .insert({
              product_id: order_content.product_id,
              order_id: data.slice(-1)[0].id,
              quantity: order_content.quantity,
              product_size: order_content.product_size,
              product_milk: order_content.product_milk,
              product_temperature: order_content.product_temperature,
              special_instruction: order_content.special_instruction,
              price: order_content.product_price,
              fixed_cost: order_content.fixed_cost
            })
            .into("ordered_item");
        });
      }
    });
  }

  update(user, change, ordered_item_id) {
    console.log(ordered_item_id, "sfsdfsdfsdfsdfsfsfsdfsdsfsdfsdfsdfsdfds");
    console.log(change);

    // if(change.product_size === "medium"){
    //   console.log('this product +=4');
    //   change.product_price+=4

    // }else if(change.product_size === "large"){

    //   change.product_price+=8
    // }else{
    //   console.log('nothing happens');
    // }

    let query = this.knex
      .select(
        "ordered_item.id",
        "ordered_item.product_id",
        "ordered_item.quantity",
        "ordered_item.product_size",
        "ordered_item.product_milk",
        "ordered_item.product_temperature",
        "ordered_item.price",
        "ordered_item.special_instruction"
      )
      .from("ordered_item")
      .where("ordered_item.id", ordered_item_id);

    return query.then(data => {
      let newPrice = data[0].price;
      console.log(
        data,
        "line201 orderitemservice =xxxxxxxxxxxxxxxxxxxx=============================================================================================================================================================================================="
      );
      if (
        data[0].product_size === "small" &&
        change.product_size === "medium"
      ) {
        newPrice += 4;
      } else if (
        data[0].product_size === "small" &&
        change.product_size === "large"
      ) {
        newPrice += 8;
      } else if (
        data[0].product_size === "medium" &&
        change.product_size === "small"
      ) {
        newPrice -= 4;
      } else if (
        data[0].product_size === "medium" &&
        change.product_size === "large"
      ) {
        console.log(
          "helloxxxxxhelloxxxxxhelloxxxxxhelloxxxxxhelloxxxxxhelloxxxxxhelloxxxxx"
        );

        newPrice += 4;
      } else if (
        data[0].product_size === "large" &&
        change.product_size === "small"
      ) {
        newPrice -= 8;
      } else if (
        data[0].product_size === "large" &&
        change.product_size === "medium"
      ) {
        console.log("lmlmlmlmlmlmlmlmlmlmlmlmlmlmlmlmlmlmlmlmlmlmlmlmlm");
        newPrice -= 4;
      }

      return this.knex
        .select(
          "ordered_item.id",
          "ordered_item.product_id",
          "ordered_item.quantity",
          "ordered_item.product_size",
          "ordered_item.product_milk",
          "ordered_item.product_temperature",
          "ordered_item.special_instruction"
        )
        .from("ordered_item")
        .where("ordered_item.id", ordered_item_id)
        .update({
          quantity: change.quantity,
          product_temperature: change.product_temperature,
          product_milk: change.product_milk,
          product_size: change.product_size,
          price: newPrice,
          special_instruction: change.special_instruction
        });
    });
  }

  delete(order_item_id, remove) {
    console.log(order_item_id);
    console.log(remove);
    console.log("removing");

    let query = this.knex
      .select(
        "order.id as orderID",
        "ordered_item.id as ordered_item_id",
        "order.status"
      )
      .from("ordered_item")
      // .where('ordered_item.id', order_item_id)
      .innerJoin("order", "order.id", "ordered_item.order_id")
      .where("order.status", "pending");
    return query.then(data => {
      if (data.length > 1) {
        return this.knex("ordered_item")
          .where("ordered_item.id", order_item_id)
          .del();
      } else if (data.length === 1) {
        console.log(
          "attempting to delete the last item in cart <====================="
        );
        return this.knex("ordered_item")
          .where("ordered_item.id", order_item_id)
          .del()
          .then(() => {
            return this.knex("order")
              .where("order.status", "pending")
              .del();
          });
      }
    });
  }

  changeStatus(content) {}

  refund(user, content, orderItemID) {
    console.log(content, orderItemID, "content");

    console.log("refund");
    // console.log(user, content, orderItemID);

    let query = this.knex
      .select("order.id as orderID", "ordered_item.id as orderItemID")
      .from("ordered_item")
      .innerJoin("order", "order.id", "ordered_item.order_id") //need order ID
      .where("order.id", content.order_id)
      .where("ordered_item_status", "paid")
      .orderBy("order.id", "asc");

    return query.then(data => {
      console.log(data, "2229<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<,");

      if (data.length > 1) {
        console.log(data.length, "229===================");

        console.log(data, "line227");

        return this.knex
          .from("ordered_item")
          .where("ordered_item.id", orderItemID)
          .update({
            ordered_item_status: "refunded"
          })
          .then(data => {
            console.log(data, "line242");
            return this.knex
              .from("order")
              .where("order.id", content.order_id)
              .update({
                status: "partial refund"
              });
          });
      } else if (data.length === 1) {
        console.log(data.length, "252===================");
        console.log("data = 1 or 0");
        return this.knex
          .from("ordered_item")
          .where("ordered_item.id", orderItemID)
          .update({
            ordered_item_status: "refunded"
          })
          .then(data => {
            console.log(data, "line242");
            return this.knex
              .from("order")
              .where("order.id", content.order_id)
              .update({
                status: "full refund"
              });
          });
      }
    });
  }
}
module.exports = OrderedItemService;
