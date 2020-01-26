import exporter from 'highcharts-export-server'
import ChartHelpers, { jsonParseFallback } from '../libs/ChartHelpers'

//Set up a pool of PhantomJS workers
exporter.initPool()

export default function Chart(req, res) {
  return new Promise(async (resolve, reject) => {
    try {
      const routeParams = req.params
      const body        = ((req.method.toLowerCase() == 'post') ? (req.body || req.query) : (req.query || req.body)) || {}
      const chartType   = routeParams.type || body.type
      const rawConfig   = jsonParseFallback(body.raw || {}, {})
      const chartData   = (body.data || '').split(',')

      delete(body.data)

      if (chartData.length <= 1 && !rawConfig.series)
        return res.status(400).json({ status: 400, error: `Please pass valid data. If you passed a 'raw' param with data populated in the 'series' key, there is likely something wrong with the JSON config you passed.` })

      const finalConfig   = ChartHelpers.getConfig(chartData, Object.assign(body, { type: chartType }), rawConfig)
      const imageBuffer   = await ChartHelpers.createChart(exporter, finalConfig)

      res.setHeader('Content-Type', 'image/png')
      res.send(imageBuffer)
      resolve(imageBuffer)

    } catch(err) {
      res.status(500).json({ status: 500, error: err })
      reject(err)
    }
  })
}
