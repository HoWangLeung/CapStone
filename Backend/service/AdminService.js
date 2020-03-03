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
        product_price: content.product_price
      })
      .into('product')
  }

  getChartDataDay () {
    console.log('getting chart data day line32 admin service')

    let query = this.knex
      .select(
        'product.id as product_id',
        'product.product_name',
        this.knex.raw("date_trunc('day', ordered_item.created_at)"),
        // 'ordered_item.created_at'
      )
      .from('ordered_item')
      .sum('ordered_item.quantity as total_ordered_quantity')
      .innerJoin('product', 'product.id', 'ordered_item.product_id')
      .groupBy('product.id', 'product.product_name')
      .groupByRaw("date_trunc('day', ordered_item.created_at )")
      .orderBy('product.id')

    // .select('product.product_name', 'ordered_item.quantity')
    // .from('ordered_item')
    // .innerJoin('product', 'product.id', 'ordered_item.product_id')

    return query.then(data => {
      console.log(data)

      // console.log(new Date(data[0].date_trunc));
      console.log(data[0].created_at, '<=================')

      let date = new Date(data[0].created_at)
      console.log(date, 'date')

      return data
    })
  }

  edit (product_id, content) {
    console.log('admin trying to edit')

    console.log(product_id)
    return this.knex
      .select(
        'product.genre_id',
        'product.product_img',
        'product.product_cost',
        'product.product_price'
      )
      .from('product')
      .where('product.id', product_id)
      .update({
        genre_id: 1,
        product_name: content.product_name,
        product_img: content.product_img,
        product_cost: content.product_cost,
        product_price: content.product_price
      })
      .orderBy('product.id')
  }

  remove (product_id) {
    console.log(product_id)
    console.log('admin removing product')

    return this.knex('product')
      .where('product.id', product_id)
      .del()
  }
}

module.exports = AdminService
