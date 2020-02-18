class ProductService {
  constructor (knex) {
    this.knex = knex
  }

  list () {
    console.log('reached list()')
    let query = this.knex
      .from('displayMenu')
      .innerJoin('product', 'displayMenu.product_id', 'product.id')

    return query.then(rows => {
      console.log(rows,'sdf')
      return rows
    })
  }
}

module.exports = ProductService
