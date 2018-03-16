const Koa = require('koa')
const fs = require('fs')
const app = new Koa()
const cors = require('koa2-cors');
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')

app.use(bodyParser())

app.use(cors({
  origin: function (ctx) {
      return '*';
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,  
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

const home = new Router()

home.get('/', async (ctx) => {

  let html = `
    <ul>
      <li><a href="/page/helloworld">/page/helloworld</a></li>
      <li><a href="/page/404">/page/404</a></li>
    </ul>
  `
  ctx.body = html
})

const page = new Router()
const ppage = new Router()


page.get('/404', async (ctx) => {

  ctx.body = '404'
}).get('/helloworld', async (ctx) => {
  console.log(ctx, 'hellssso')
  ctx.body = ctx.params.id
}).post('/users', (ctx, next) => {
  let postData = ctx.request.body
  console.log(postData)
  ctx.body = 'fucking users'
})

ppage.use('/hello/:id', page.routes(), page.allowedMethods())

const staticPath = './static'

let router = new Router()

router.use('/', home.routes(), home.allowedMethods())
router.use('/page', ppage.routes(), ppage.allowedMethods())

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000)

