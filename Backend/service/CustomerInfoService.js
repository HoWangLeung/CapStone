class CustomerInfoService {
  constructor (knex) {
    this.knex = knex
  }

  list () {
    let query = this.knex.from('product').orderBy('product.id')

    return query.then(rows => {
      return rows
    })
  }

  add (user, content) {
    console.log('trying to add a new customerinfo')
    console.log(content)

    let query = this.knex
      .from('customer_info')
      .where('customer_info.user_id', user.id)

    query.then(data => {
      console.log(data,'line23===========================================')
      if(data.length === 1){

   
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
        .into('customer_info')
        .where('customer_info.user_id', user.id)
      }else{
        return this.knex
        .insert({
          user_id:user.id,
          first_name: content.firstName,
          last_name: content.lastName,
          address1: content.address1,
          address2: content.address2,
          district: content.district,
          area: content.area,
          phone: content.phone,
          gender: content.gender
        })
        .into('customer_info')
        .where('customer_info.user_id', user.id)
      }
    })
  }
}

module.exports = CustomerInfoService
