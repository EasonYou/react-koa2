const webpack = require('webpack')
const Express = require('express')
const proxy = require('http-proxy-middleware')
const opn = require('opn')
const app = new Express()
const webpackDevConfig = require('./webpack.config.dev.js')
const compiler = webpack(webpackDevConfig)
const devConfig = require('./config.dev.js')

const devMiddleware = require('webpack-dev-middleware')(compiler)
const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 1000,
  reload: true
})
const proxyTable = devConfig.proxyTable
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxy(options.filter || context, options))
})
app.use(devMiddleware)
app.use(hotMiddleware)
devMiddleware.waitUntilValid(() => {
  opn('http://localhost:8081')
})
app.listen(8081)
