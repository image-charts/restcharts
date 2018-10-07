import serverless from 'serverless-http'
import startServer from './libs/startServer'

const app = startServer(false)
module.exports.handler = serverless(app, { binary: ['image/*'] })
