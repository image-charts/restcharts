import http from 'http'
import path from 'path'
import fs from 'fs'
import bodyParser from 'body-parser'
import express from 'express'
import throng from 'throng'
import bunyan from 'bunyan'
import Routes from '../libs/Routes'
import config from '../config'

const app         = express()
const httpServer  = http.Server(app)
const log         = bunyan.createLogger(config.logger.options)

export default async function startApp() {
  try {
    const routes = await Routes.get()

    //view engine setup
    app.set('views', path.join(__dirname, '..', 'views'))
    app.set('view engine', 'pug')

    app.use(bodyParser.urlencoded({extended: true, limit: '1mb'}))
    app.use(bodyParser.json({limit: '1mb'}))

    //static files
    app.use('/public', express.static(path.join(__dirname, '..', '/public')))

    // initialize routes object to be used to bind express routes
    const aRoutes = fs.readdirSync('routes').filter(file => fs.lstatSync(path.join('routes', file)).isFile())
    let oRoutes = {}
    aRoutes.forEach(r => oRoutes[r] = require(path.join('..', 'routes', r)))

    //setup route handlers in the express app
    routes.forEach(route => {
      try {
        app[route.verb.toLowerCase()](route.path, oRoutes[route.file].default)
        log.debug(`Successfully bound route to express; method: ${route.verb}; path: ${route.path}`)
      } catch(err) {
        log.error(err, `Error binding route to express; method: ${route.verb}; path: ${route.path}`)
      }
    })

    httpServer.listen(config.server.port, () => log.info(`listening on *: ${config.server.port}`))

  } catch(err) {
    log.error("Error starting server", err)
    process.exit()
  }

  //handle if the process suddenly stops
  process.on('SIGINT', () => { console.log('got SIGINT....'); process.exit() })
  process.on('SIGTERM', () => { console.log('got SIGTERM....'); process.exit() })
}
