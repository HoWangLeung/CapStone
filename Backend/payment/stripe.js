
// // if(process.env.NODE_ENV !== 'production'){

// // }

// require('dotenv').config()

// const stripeSecretKey = process.env.STRIPE_SECRET_KEY
// const stripePublicKey = process.env.STRIPE_PUBLIC_KEY

// console.log(stripeSecretKey);
// console.log(stripePublicKey);



const stripe = require('stripe')('sk_test_VSPqZxwGfLXAyFZcc0HaAK8600zztVGOji');

(async () => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: 'hkd',
  });
})();