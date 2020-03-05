//======================================Require================//
require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const knexConfig = require('./knexfile').development
const knex = require('knex')(knexConfig)
//=====login==========//
const jwt = require('jwt-simple')
const config = require('./config')
// const users = require('./users')
const bearerToken = require('express-bearer-token')
const authClass = require('./auth/local')(knex)
//======================================Require================//

//======================================App.use================//
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors({ origin: true }))
//======================================App.use================//

//======================================customerInfoROUTERS================//
const CustomerInfoService = require('./service/CustomerInfoService')
const CustomerInfoRouter = require('./router/CustomerInfoRouter')
const customerInfoService = new CustomerInfoService(knex)
app.use(
  '/api/customerInfo',
  authClass.authenticate(),
  new CustomerInfoRouter(customerInfoService).router()
)
//======================================customerInfoROUTERS================//

//======================================adminROUTERS================//
const AdminService = require('./service/AdminService')
const AdminRouter = require('./router/AdminRouter')
const adminService = new AdminService(knex)
app.use(
  '/api/admin',
  authClass.authenticate(),
  new AdminRouter(adminService).router()
)

//======================================adminROUTERS================//

//======================================paymentROUTERS================//
const PaymentService = require('./service/PaymentService')
const PaymentRouter = require('./router/PaymentRouter')
const paymentService = new PaymentService(knex)
app.use(
  '/api/stripe',
  authClass.authenticate(),
  new PaymentRouter(paymentService).router()
)
//=========webhookROUTERS=========//
const WebhookService = require('./service/WebhookService')
const WebhookRouter = require('./router/WebhookRouter')
const webhookService = new WebhookService(knex)
app.use('/stripe-webhook', new WebhookRouter(webhookService).router())

//=========webhookROUTERS=========//

//======================================paymentROUTERS================//

//======================================productROUTERS================//
const ProductService = require('./service/ProductService')
const ProductRouter = require('./router/ProductRouter')
const productService = new ProductService(knex)
app.use('/api/product', new ProductRouter(productService).router())
//======================================productROUTERS================//

//======================================shoppingCartROUTERS================//
const OrderedItemService = require('./service/OrderedItemService')
const PurchaseRouter = require('./router/OrderedItemRouter')
const orderedItemService = new OrderedItemService(knex)

app.use(
  '/api/orderedItem',
  authClass.authenticate(),
  new PurchaseRouter(orderedItemService).router()
)

//======================================shoppingCartROUTERS================//
app.use(
  bearerToken({
    reqKey: 'bearerToken'
  })
)
// custom middleware that logs the bearer token from client
app.use((req, res, next) => {
  if (req.bearerToken) {
    console.log(req.bearerToken)
  }
  next()
})

app.use(authClass.initialize())

app.get('/', (req, res) => {
  res.json({
    success: 1
  })
})

app.post('/api/login', async (req, res) => {
  console.log('received a post request line 62')

  let db_users = knex.from('users')
  // .innerJoin('users', 'customer.user_id', 'users.id')
  // .innerJoin('admin','admin.user_id','users.id')
  // .leftJoin('users', 'admin.user_id', 'users.id')
  // .innerJoin('admin','users.id','admin.user_id')
  // .innerJoin('customer', 'users.id', 'customer.user_id')
  db_users.then(user_data => {
    if (req.body.email && req.body.password) {
      const email = req.body.email
      const password = req.body.password

      // using array of users from './users.js'. You should use a real database
      console.log(user_data)

      const user = user_data.find(
        u => u.email == email && u.password == password
      )

      // console.log(user)

      if (user) {
        console.log('start with user', user.is_admin)

        let payload = {
          id: user.id,
          is_admin: user.is_admin,
          // you can put other data in the payload
          // in this example, we put the current time.
          // so later if we decide we should invalidate a old token, we can.
          tokenCreatedDate: new Date().getTime()
        }

        // sign a token and send it to browser. Browser will use it to access protected routes
        const token = jwt.encode(payload, config.jwtSecretUsedForSigning)
        res.json({
          token: token
        })
      } else {
        // console.log('no');

        res.sendStatus(401)
      }
    } else {
      res.sendStatus(401)
    }
  })
})

app.get('/secret', authClass.authenticate(), (req, res) => {
  const user = req.user
  res.json({
    success: 1,
    message: `You are ${user.name}. your id is ${user.id}`
  })
})
//======================================LOGIN================//

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running at ${PORT}.`)
})

module.exports = app
