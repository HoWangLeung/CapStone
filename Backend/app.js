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

//======================================productROUTERS================//
const ProductService = require('./service/ProductService')
const ProductRouter = require('./router/ProductRouter')
const productService = new ProductService(knex)
app.use('/api/product', new ProductRouter(productService).router())
//======================================productROUTERS================//

//======================================shoppingCartROUTERS================//
const PurchaseService = require('./service/PurchaseService')
const PurchaseRouter = require('./router/PurchaseRouter')
const purchaseService = new PurchaseService(knex)
app.use(
  '/api/purchase', authClass.authenticate(),
  new PurchaseRouter(purchaseService).router()
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
  let db_users = knex
    .from('customer', 'admin')
    .innerJoin('users', 'customer.user_id', 'users.id')
    // .innerJoin('admin','admin.user_id','users.id')
    // .leftJoin('users', 'admin.user_id', 'users.id')
    // .innerJoin('admin','users.id','admin.user_id')
    // .innerJoin('customer', 'users.id', 'customer.user_id')
    .then(user_data => {
      if (req.body.email && req.body.password) {
        const email = req.body.email
        const password = req.body.password

        // using array of users from './users.js'. You should use a real database

        const user = user_data.find(
          u => u.email == email && u.password == password
        )

        // console.log(user)

        if (user) {
          console.log('start with user')

          let payload = {
            id: user.id,
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
