class PurchaseService {
  constructor (knex) {
    this.knex = knex
  }

  list () {
    let query = this.knex.from('purchase')

    return query.then(rows => {
      return rows
    })
  }

  add(){
    console.log('adding');
    
  }
}
module.exports = PurchaseService
