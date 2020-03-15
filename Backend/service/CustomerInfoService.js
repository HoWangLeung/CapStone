class CustomerInfoService {
  constructor(knex) {
    this.knex = knex;
  }

  list(user) {
    let query = this.knex
      .from("customer_info")
      .where("customer_info.user_id", user.id);

    return query.then(rows => {
      console.log(
        rows,
        "line12 info service------>---->---->---->---->---->---->---->---->---->---->---->---->---->---->---->---->---->---->---->---->---->---->---->---->---->---->-->"
      );

      if (rows.length === 0) {
        return this.knex
          .select("users.id as user_id")
          .from("users")
          .where("users.id", user.id);
      } else {
        return rows;
      }
    });
  }

  add(user, content) {
    console.log("trying to add a new customerinfo");
    console.log(content);

    let query = this.knex
      .from("customer_info")
      .where("customer_info.user_id", user.id);

    query.then(data => {
      console.log(data, "line23===========================================");
      if (data.length === 1) {
        return this.knex
          .update({
            first_name: content.firstName,
            last_name: content.lastName,
            address1: content.address1,
            address2: content.address2,
            district: content.district,
            area: content.area,
            phone: content.phone,
            gender: content.gender
          })
          .into("customer_info")
          .where("customer_info.user_id", user.id);
      } else {
        return this.knex
          .insert({
            user_id: user.id,
            first_name: content.firstName,
            last_name: content.lastName,
            address1: content.address1,
            address2: content.address2,
            district: content.district,
            area: content.area,
            phone: content.phone,
            gender: content.gender
          })
          .into("customer_info")
          .where("customer_info.user_id", user.id);
      }
    });
  }

  updateInfo(user, content) {
    console.log("line60=======");

    let query = this.knex
      .from("customer_info")
      .where("customer_info.user_id", user.id);

    return query.then(data => {
      console.log(data, "line23===========================================");
      if (data.length === 1) {
        console.log("data length is 1 now");

        return this.knex
          .update({
            first_name: content.firstName,
            last_name: content.lastName,
            address1: content.address1,
            address2: content.address2,
            district: content.district,
            area: content.area,
            phone: content.phone,
            gender: content.gender
          })
          .into("customer_info")
          .where("customer_info.user_id", user.id)
          .then(data => {
            return this.knex
              .update({
                password: content.password1
              })
              .into("users")
              .where("users.id", user.id);
          });
      } else {
        return this.knex
          .insert({
            user_id: user.id,
            first_name: content.firstName,
            last_name: content.lastName,
            address1: content.address1,
            address2: content.address2,
            district: content.district,
            area: content.area,
            phone: content.phone,
            gender: content.gender
          })
          .into("customer_info")
          .where("customer_info.user_id", user.id);
      }
    });
  }
}

module.exports = CustomerInfoService;
