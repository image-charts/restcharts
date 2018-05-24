import bunyan from 'bunyan'
import GeoIp from '../libs/GeoIp'
import ChartExamples from '../libs/ChartExamples'
import config from '../config'

const log = bunyan.createLogger(config.logger.options)

export default async function Index(req, res) {
  try {
    res.render('index', {
      data: {
        api_host: config.server.api_host,
        host: config.server.host,
        types: ChartExamples
      }
    })

  } catch(err) {
    log.error("Error sending slack message", err)
  }
}
