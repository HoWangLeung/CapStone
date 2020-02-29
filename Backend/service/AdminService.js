class AdminService {
  constructor (knex) {
    this.knex = knex
  }

  list () {
    console.log('admin getting')

    let query = this.knex.from('product')

    return query.then(rows => {
      return rows
    })
  }
  add (content) {
    console.log('admin adding')

    console.log(content)

    return this.knex
      .insert({
        genre_id: 1,
        product_name: content.product_name,
        product_img: content.product_img,
        product_cost: content.product_cost,
        product_price: content.product_price,
      })
      .into('product')
  }

  edit(product_id,content){
    console.log('admin trying to edit');
    
    console.log(product_id);
    return this.knex
    .select('product.genre_id','product.product_img','product.product_cost','product.product_price')
    .from('product')
    .where('product.id',product_id)
    .update({
      genre_id: 1,
      product_name: content.product_name,
      product_img: content.product_img,
      product_cost: content.product_cost,
      product_price: content.product_price,
    })
    .orderBy('product.id')
    
  }

  remove(product_id){
    console.log(product_id);
    console.log('admin removing product');

    return this.knex('product')
    .where('product.id', product_id)
    .del()
    
  }
}

module.exports = AdminService
