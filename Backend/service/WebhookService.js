class WebhookService {
  constructor (knex) {
    this.knex = knex
  }

  changeStatus(paymentIntent_id){
    console.log('trying to change status line 7 WebhookService');
    return this.knex
      .select('order.status', 'pending')
      .from('order')
      .where('order.paymentIntent_id', paymentIntent_id)
      .update({
        status: 'paid'
      })
      
  }

}

module.exports = WebhookService
