import fs from 'fs'
import exporter from 'highcharts-export-server'
import ChartHelpers, { jsonParseFallback } from '../libs/ChartHelpers'

//Set up a pool of PhantomJS workers
exporter.initPool()

export default async function Chart(req, res) {
  try {
    const routeParams = req.params
    const chartType   = routeParams.type

    const body        = req.query || req.body || {}
    const rawConfig   = jsonParseFallback(body.raw || {}, {})
    const chartData   = (body.data || '').split(',')

    delete(body.data)

    if (chartData.length <= 1 && !rawConfig.series)
      return res.status(400).json({ status: 400, error: `Please pass valid data. If you passed a 'raw' param with data populated in the 'series' key, there is likely something wrong with the JSON config you passed.` })

    const finalConfig = ChartHelpers.getConfig(chartData, Object.assign(body, { type: chartType }), rawConfig)
    exporter.export({ type: 'png', options: finalConfig}, function(err, response) {
      if (err)
        return res.status(500).json({ status: 500, error: err })

      const imageBase64 = response.data
      const imageBuffer = Buffer.from(imageBase64, 'base64')

      res.setHeader('Content-Type', 'image/png')
      res.send(imageBuffer)
    })

  } catch(err) {
    res.status(500).json({ status: 500, error: err })
  }
}
