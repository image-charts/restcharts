export default {
  getChartConfig(data, options={}) {
    const type    = options.type || 'area'
    const color   = options.color
    const height  = options.height
    const width   = options.width
    const opacity = options.opacity

    return {
      chart: {
        type: type,
        backgroundColor: 'rgba(0, 0, 0, 0)',
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
}
