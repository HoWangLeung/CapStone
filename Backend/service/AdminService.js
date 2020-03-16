class AdminService {
  constructor(knex) {
    this.knex = knex;
  }

  getIncome() {
    let date = new Date();

    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if (month < 10) {
      month = "0" + month;
    }

    let thisMonth = month + "/" + year;
    console.log(thisMonth);

    console.log("getting income");

    let query = this.knex
      .select(
        // 'ordered_item.price',
        // 'ordered_item.quantity',
        // this.knex.raw("to_char(created_at, 'DD/MM/YYYY')"),
        this.knex.raw(" sum(quantity*price) as income_thisMonth ")
      )

      .from("ordered_item")
      .where(this.knex.raw("to_char(created_at, 'MM/YYYY')"), thisMonth)
      .where("ordered_item_status", "paid");

    return query.then(income_thisMonth => {
      console.log(income_thisMonth, "line33========>");

      let CostQuery = this.knex
        .select(
          // 'ordered_item.quantity',
          // 'product.product_cost',
          this.knex.raw(" sum(quantity*fixed_cost) as cost_thisMonth ")
        )
        .from("ordered_item")
        // .innerJoin("product", "product.id", "ordered_item.product_id")
        .where(this.knex.raw("to_char(created_at, 'MM/YYYY')"), thisMonth)
        .where("ordered_item_status", "paid");

      return CostQuery.then(cost_thisMonth => {
        console.log(cost_thisMonth, "line51========>>>");

        console.log(income_thisMonth[0], cost_thisMonth[0]);

        let MonthlyIncome = income_thisMonth[0];
        let MonthlyCost = cost_thisMonth[0];

        return { MonthlyIncome, MonthlyCost };
      });
    });
  }

  list() {
    console.log("admin getting");

    let query = this.knex.from("product");

    return query.then(rows => {
      return rows;
    });
  }
  add(content) {
    console.log("admin adding");

    console.log(content);

    return this.knex
      .insert({
        genre_id: 1,
        product_name: content.product_name,
        product_img: content.product_img,
        product_cost: content.product_cost,
        product_price: content.product_price
      })
      .into("product");
  }
  changeYear(content) {
    console.log("changing year");
    console.log(content.year);
    let selected_year = content.year;

    // let selected_year = content.year
    let query = this.knex
      .select(this.knex.raw("to_char(ordered_item.created_at, 'MM/YYYY')"))
      .from("ordered_item")
      .where(
        this.knex.raw("to_char(ordered_item.created_at, 'YYYY')"),
        selected_year
      )
      .where("ordered_item.ordered_item_status", "paid")

      .sum("ordered_item.quantity as total_ordered_quantity")

      .groupByRaw("to_char(ordered_item.created_at, 'MM/YYYY')");

    return query.then(data => {
      console.log(data);
      return data;
    });
  }

  getChartDataYear() {
    let date = new Date();
    let currentYear = date.getFullYear();
    console.log(currentYear);

    let query = this.knex
      .select(this.knex.raw("to_char(created_at, 'YYYY') as created_at"))
      .from("ordered_item")
      .where(
        this.knex.raw("to_char(ordered_item.created_at, 'YYYY')"),
        currentYear
      )
      .where("ordered_item.ordered_item_status", "paid")
      .sum("quantity as total_ordered_quantity")
      .groupByRaw("to_char(ordered_item.created_at, 'YYYY')");

    return query.then(data => {
      console.log(data);
      return data
    });
  }

  changeDate(content) {
    console.log("changing date");
    console.log(content.new_date, "line32");
    let selected_date = content.new_date;

    let query = this.knex
      .select(
        "product.id as product_id",
        "product.product_name",
        this.knex.raw("to_char(ordered_item.created_at, 'DD/MM/YYYY')")
      )
      .from("ordered_item")
      .where("ordered_item.ordered_item_status", "paid")

      .where(
        this.knex.raw("to_char(ordered_item.created_at, 'DD/MM/YYYY')"),
        selected_date
      )
      .sum("ordered_item.quantity as total_ordered_quantity")
      .innerJoin("product", "product.id", "ordered_item.product_id")
      // .innerJoin("order", "order.id", "ordered_item.order_id")
      // .where("order.status", "paid")
      .groupBy("product.id", "product.product_name")
      .groupByRaw("to_char(ordered_item.created_at, 'DD/MM/YYYY')")
      .orderBy("product.id");

    return query.then(data => {
      console.log(data);

      return data;
    });
  }

  getChartDataDay() {
    console.log("getting chart data day line32 admin service");
    let date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    if (day < 10) {
      day = "0" + day;
    }
    if (month < 10) {
      month = "0" + month;
    }

    let today = day + "/" + month + "/" + year;
    console.log(today);

    let query = this.knex
      .select(
        "product.id as product_id",
        "product.product_name",
        this.knex.raw("to_char(ordered_item.created_at, 'DD/MM/YYYY')")
        // "order.status",

        // // 'ordered_item.created_at'
      )
      .from("ordered_item")
      .where("ordered_item.ordered_item_status", "paid")
      .where(
        this.knex.raw("to_char(ordered_item.created_at, 'DD/MM/YYYY')"),
        today
      )
      .sum("ordered_item.quantity as total_ordered_quantity")
      .innerJoin("product", "product.id", "ordered_item.product_id")
      // .innerJoin("order", "order.id", "ordered_item.order_id")
      // .where("order.status", "paid")
      // .orWhere("order.status", "partial refund")
      .groupBy("product.id", "product.product_name")
      .groupByRaw("to_char(ordered_item.created_at, 'DD/MM/YYYY')")
      .orderBy("product.id");

    // .select('product.product_name', 'ordered_item.quantity')
    // .from('ordered_item')
    // .innerJoin('product', 'product.id', 'ordered_item.product_id')

    return query.then(data => {
      console.log(data, "line199=====================================");

      return data;
    });
  }

  edit(product_id, content) {
    console.log("admin trying to edit");

    console.log(product_id);
    return this.knex
      .select(
        "product.genre_id",
        "product.product_img",
        "product.product_cost",
        "product.product_price"
      )
      .from("product")
      .where("product.id", product_id)
      .update({
        genre_id: 1,
        product_name: content.product_name,
        product_img: content.product_img,
        product_cost: content.product_cost,
        product_price: content.product_price
      })
      .orderBy("product.id");
  }

  remove(product_id) {
    console.log(product_id);
    console.log("admin removing product");

    return this.knex("product")
      .where("product.id", product_id)
      .del();
  }

  getOrder() {
    console.log("getting order");
    let query = this.knex
      .select(
        "ordered_item.id as ordered_item_id",
        "order.id as order_id",
        "users.id as user_id",
        "order.status as order_status",
        "ordered_item.ordered_item_status as ordered_item_status",
        "ordered_item.quantity",
        "ordered_item.price",
        "product.product_name"
      )
      .from("ordered_item")
      .innerJoin("order", "ordered_item.order_id", "order.id")
      .innerJoin("users", "users.id", "order.user_id")
      .innerJoin("customer_info", "customer_info.user_id", "users.id")
      .innerJoin("product", "product.id", "ordered_item.product_id");

    return query.then(data => {
      console.log(data);

      return data;
    });
  }
}

module.exports = AdminService;
