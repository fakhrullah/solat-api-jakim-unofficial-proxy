'use strict'

const path = require('path')
const AutoLoad = require('fastify-autoload')

module.exports = function (fastify, opts, next) {
  // Place here your custom code!

  fastify.decorate('notFound', (req, reply) => {
    reply.code(404).send({
      message: 'This is just proxy for Solat Jakim API (Unofficial) - https://api.azanpro.com/reference/times/today'
    })
  })
  fastify.setNotFoundHandler(
    {},
    fastify.notFound
  )
  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in services
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'services'),
    options: Object.assign({}, opts)
  })

  // Make sure to call next when done
  next()
}
