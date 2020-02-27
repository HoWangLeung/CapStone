const stripe = require('stripe')('sk_test_VSPqZxwGfLXAyFZcc0HaAK8600zztVGOji')

;(async () => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 2599,
    currency: 'hkd'
  })
})().then(data => console.log( 'success'))


