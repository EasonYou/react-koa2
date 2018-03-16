module.exports = {
  proxyTable: {
    '/amibook/api/book': {
      target: 'http://123.58.44.31:8066',
      changeOrigin: true
    }
  }
}
