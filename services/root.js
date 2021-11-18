'use strict'

const got = require('got')
const queryString = require('querystring')
const gotOptions = {
  rejectUnauthorized: false
};

module.exports = function (fastify, opts, next) {
  fastify.get('/', function (request, reply) {
    reply.send({ 
      message: 'This is proxy to Solat Jakim API (Unofficial) https://api.azanpro.com/reference/times/today'
    })
  })

  fastify.get('/times/:time', async function (request, reply) {
    const {time} = request.params
    const queryBuilder = queryString.encode(request.query)
    try {
        const response = await got(`https://api.azanpro.com/times/${time}?${queryBuilder}`, gotOptions)
        console.log(response.body)
        return JSON.parse(response.body)
    } catch (error) {
        console.error(error)
        return {error}
    }
  })

  fastify.get('/zone/:zoneVars', async function (request, reply) {
    const {zoneVars} = request.params
    const queryBuilder = queryString.encode(request.query)
    if (zoneVars !== 'states' || zoneVars !== 'zones' || zoneVars !== 'grouped') {
      return fastify.notFound(request, reply)
    }
    try {
        const response = await got(`https://api.azanpro.com/zone/${zoneVars}?${queryBuilder}`, gotOptions)
        console.log(response.body)
        return JSON.parse(response.body)
    } catch (error) {
        console.error(error)
        return {error}
    }
  })

  next()
}

// If you prefer async/await, use the following
//
// module.exports = async function (fastify, opts) {
//   fastify.get('/', async function (request, reply) {
//     return { root: true }
//   })
// }
