class WebhookService {
  constructor (knex) {
    this.knex = knex
  }

  changeStatus(paymentIntent_id){
    console.log('trying to change status line 7 WebhookService');

    // return this.knex
    // .select('ordered_item_status','pending')
    // .from('ordered_item')
    return this.knex
      .select('order.status', 'pending')
      .from('order')
      .where('order.paymentIntent_id', paymentIntent_id)
      .update({
        status: 'paid'
      })
      .returning("order.id")
      .then(orderID=>{
        console.log(orderID[0],'line21 webhook service---');
        
          return this.knex.from("ordered_item")
          .where("ordered_item.order_id",orderID[0])
          .update({
            ordered_item_status:'paid'
          })
      });
  }
}

module.exports = WebhookService
