import http from 'http'
import path from 'path'
import fs from 'fs'
import bodyParser from 'body-parser'
import express from 'express'
import cors from 'cors'
import throng from 'throng'
import bunyan from 'bunyan'
import Routes from '../libs/Routes'
import config from '../config'

const app         = express()
const httpServer  = http.Server(app)
const log         = bunyan.createLogger(config.logger.options)

export default function startApp(shouldListenOnPort=true) {
  try {
    const routes = Routes.get()

    //view engine setup
    app.set('views', path.join(__dirname, '..', 'views'))
    app.set('view engine', 'pug')

    app.use(bodyParser.urlencoded({extended: true, limit: '1mb'}))
    app.use(bodyParser.json({limit: '1mb'}))

    // All routes should be CORS enabled
    app.use(cors())

    //static files
    app.use('/public', express.static(path.join(__dirname, '..', '/public')))

    //setup route handlers in the express app
    routes.forEach(route => {
      try {
        app[route.verb.toLowerCase()](route.path, route.handler)
        log.debug(`Successfully bound route to express; method: ${route.verb}; path: ${route.path}`)
      } catch(err) {
        log.error(err, `Error binding route to express; method: ${route.verb}; path: ${route.path}`)
      }
    })

    if (shouldListenOnPort)
      httpServer.listen(config.server.port, () => log.info(`listening on *: ${config.server.port}`))

    return app

  } catch(err) {
    log.error("Error starting server", err)
    process.exit()
  }

  //handle if the process suddenly stops
  process.on('SIGINT', () => { console.log('got SIGINT....'); process.exit() })
  process.on('SIGTERM', () => { console.log('got SIGTERM....'); process.exit() })
}
