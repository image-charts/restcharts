import fs from 'fs'
import request from 'request-promise-native'

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
    const baseUrl     = 'http://export.highcharts.com'

    if (chartData.length <= 1)
      return res.status(400).json({ error: 'Please pass valid data.' })

    const newImageBody = await request.post({
      url:      baseUrl,
      headers:  { 'Content-type': 'application/json' },
      body:     JSON.stringify({
        async: true,
        asyncRendering: false,
        callback: "",
        constr: "Chart",
        infile: getChartConfig(chartData, {
          type: type,
          color: chartColor,
          opacity: fillOpacity,
          height: height,
          width: width
        }),
        scale: false,
        styledMode: false,
        type: "image/png",
        width: false
      })
    })

    const imageBuffer = await request.get({ url: `${baseUrl}/${newImageBody}`, encoding: null })

    res.setHeader('Content-Type', 'image/png')
    res.send(imageBuffer)

  } catch(err) {
    res.status(500).json({ error: err })
  }
}

function getChartConfig(data, options={}) {
  const type    = options.type || 'area'
  const color   = options.color
  const height  = options.height
  const width   = options.width
  const opacity = options.opacity

  return {
    chart: {
      type: type,
      margin: [ 0, 0, 0, 0 ],
      height: height,
      width: width
    },
    plotOptions: {
      area: {
        fillOpacity: opacity
      }
    },
    credits: {
      enabled: false
    },
    xAxis: {
      visible: false
    },
    yAxis: {
      visible: false
    },
    legend: {
      enabled: false
    },
    exporting: {
      enabled: false
    },
    title: {
      text: '',
    },
    series: [{
      lineWidth: 2,
      color: color,
      data: data.map(d => ({ y: parseInt(d), marker: { enabled: false }}))
    }]
  }
}
