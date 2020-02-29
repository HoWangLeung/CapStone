class ProductService {
  constructor (knex) {
    this.knex = knex
  }

  list () {
    let query = this.knex.from('product').orderBy('product.id')

    return query.then(rows => {
      return rows
    })
  }

  add(){
    console.log('trying to add a new product');
    
  }
}

module.exports = ProductService
