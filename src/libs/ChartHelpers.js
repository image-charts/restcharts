import objectAssignDeep from 'object-assign-deep'

export default {
  getConfig(data, options={}, rawConfig={}) {
    const type      = options.type || 'area'
    const color     = parseVal(options.color, 'color')
    const bgColor   = parseVal(options.bg || 'rgba(0, 0, 0, 0)', 'color')
    const height    = parseVal(options.height, 'integer')
    const width     = parseVal(options.width, 'integer')
    const opacity   = parseVal(options.opacity, 'float')
    const lineWidth = parseVal(options.linewidth || 2, 'integer')

    return objectAssignDeep({
      chart: {
        type: type,
        backgroundColor: bgColor,
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
        lineWidth: lineWidth,
        color: color,
        data: data.map(d => ({ y: parseVal(d, 'integer'), marker: { enabled: false }}))
      }]
    }, rawConfig)
  }
}

export function parseVal(val, type='string') {
  if (val) {
    switch (type) {
      case 'color':
        return (val.indexOf('rgb') === 0) ? parseVal(val, 'string') : `#${parseVal(val, 'string')}`
      case 'float':
        return parseFloat(val)
      case 'integer':
        return parseInt(val)
      case 'string':
        return val.toString()
    }
  }

  return val
}

export function jsonParseFallback(obj, fallback={}) {
  try {
    const parsed = JSON.parse(obj)
    return parsed
  } catch(e) {
    return fallback
  }
}
