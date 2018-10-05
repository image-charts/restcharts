import fs from 'fs'
import exporter from 'highcharts-export-server'
import ChartHelpers, { jsonParseFallback } from '../libs/ChartHelpers'

//Set up a pool of PhantomJS workers
exporter.initPool()

export default function Chart(req, res) {
  return new Promise((resolve, reject) => {
    try {
      const routeParams = req.params
      const body        = ((req.method.toLowerCase() == 'post') ? (req.body || req.query) : (req.query || req.body)) || {}
      const chartType   = routeParams.type || body.type
      const rawConfig   = jsonParseFallback(body.raw || {}, {})
      const chartData   = (body.data || '').split(',')

      delete(body.data)

      if (chartData.length <= 1 && !rawConfig.series)
        return res.status(400).json({ status: 400, error: `Please pass valid data. If you passed a 'raw' param with data populated in the 'series' key, there is likely something wrong with the JSON config you passed.` })

      const finalConfig = ChartHelpers.getConfig(chartData, Object.assign(body, { type: chartType }), rawConfig)
      exporter.export({ type: 'png', options: finalConfig}, function(err, response) {
        if (err) {
          res.status(500).json({ status: 500, error: err })
          return reject(err)
        }

        const imageBase64 = response.data
        const imageBuffer = Buffer.from(imageBase64, 'base64')

        res.setHeader('Content-Type', 'image/png')
        res.send(imageBuffer)
        resolve(imageBuffer)
      })

    } catch(err) {
      res.status(500).json({ status: 500, error: err })
      reject(err)
    }
  })
}
