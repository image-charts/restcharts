import fs from 'fs'
import exporter from 'highcharts-export-server'
import ChartConfig from '../libs/ChartConfig'

//Set up a pool of PhantomJS workers
exporter.initPool()

export default async function Chart(req, res) {
  try {
    const routeParams = req.params
    const type        = routeParams.type

    const body        = req.query || {}
    const chartData   = (body.data || '').split(',')
    const chartColor  = (body.hexcolor) ? `#${body.hexcolor}` : null
    const height      = (body.height) ? parseInt(body.height) : null
    const width       = (body.width) ? parseInt(body.width) : null
    const fillOpacity = (body.opacity) ? parseFloat(body.opacity) : null

    if (chartData.length <= 1)
      return res.status(400).json({ error: 'Please pass valid data.' })

    exporter.export({ type: 'png', options: ChartConfig.getChartConfig(chartData, {
        type: type,
        color: chartColor,
        opacity: fillOpacity,
        height: height,
        width: width
      })}, function(err, response) {
        //The export result is now in res.
        //If the output is not PDF or SVG, it will be base64 encoded (res.data).
        //If the output is a PDF or SVG, it will contain a filename (res.filename).

        //Kill the pool when we're done with it, and exit the application
        // exporter.killPool()
        // process.exit(1)

        const imageBase64 = response.data
        const imageBuffer = Buffer.from(imageBase64, 'base64')

        res.setHeader('Content-Type', 'image/png')
        res.send(imageBuffer)
      }
    )

  } catch(err) {
    res.status(500).json({ error: err })
  }
}
