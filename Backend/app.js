
//======================================Require================//
const express = require('express');
const app = express();
const cors = require('cors')
const bodyParser = require("body-parser");
const knexConfig = require("./knexfile").development;
const knex = require("knex")(knexConfig);
//======================================Require================//


//======================================App.use================//
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors({ origin: true }))
//======================================App.use================//



//======================================ROUTERS================//
const ProductService = require('./service/ProductService')
const ProductRouter = require('./router/ProductRouter')
const productService = new ProductService(knex)
app.use('/api/product', new ProductRouter(productService).router());
//======================================ROUTERS================//

app.get('/', (req, res) => {
    res.send('hello backend')
  })

app.listen(8080, () => {
    console.log('listening at 8080')
  })