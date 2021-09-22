'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  //通过一个地址去访问另一个地址，那么
  //访问协议(http/https)、ip、端口，三者有任何一个不一样，都会产生跨域问题
  BASE_API: '"http://localhost:8090/"',
})
