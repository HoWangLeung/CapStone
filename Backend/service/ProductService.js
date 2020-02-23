class ProductService {
  constructor (knex) {
    this.knex = knex
  }

  list () {
 
    let query = this.knex
      .from('product')
   

    return query.then(rows => {
  
      return rows
    })
  }
}

module.exports = ProductService
