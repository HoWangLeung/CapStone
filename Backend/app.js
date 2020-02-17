const express = require('express');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors({ origin: true }))



//======================================ROUTERS================//

// const LinkService = require('./service/LinkService')
// const LinkRouter = require('./router/LinkRouter')
// const linkService = new LinkService(knex)
// app.use('/api/links', new LinkRouter(linkService).router())
//======================================ROUTERS================//





app.get('/', (req, res) => {
    res.send('hello')
  })

app.listen(8080, () => {
    console.log('listening at 8080')
  })