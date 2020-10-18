const path = require('path')

const config = {
  buildDetail: false,
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 2333,
    open: true,
    hot: true,
    index: 'demo/index.html',
    overlay: {
      errors: true,
      warnings: true
    },
    historyApiFallback: true,
    proxy: {
      '/xxx': {
        target: 'http://xxx.com',
        changeOrigin: true,
        pathRewrite: {
          '^/xxx': '/'
        }
      }
    }
  },
  local: {
    API_PATH: '/api',
    SUB_DIR: 'static',
    PUBLIC_PATH: '/'
  },
  dev: {
    API_PATH: '/api'
  },
  test: {
    API_PATH: '/api'
  },
  prod: {
    API_PATH: '/api'
  }
}
module.exports = config
