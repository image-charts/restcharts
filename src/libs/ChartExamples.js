import config from '../config'

const baseUrl = config.server.api_host

export default [
  {
    name: 'Area',
    examples: [
      { name: 'Red Area Chart', url: `${baseUrl}/chart/area?data=1,2,6,4,10,7,4,5,2,9,8&color=f00` },
      { name: 'Green Area Chart', url: `${baseUrl}/chart/area?data=5,1,2,9,8,3,0,0,4&color=00ff00` },
      { name: 'Blue Area Chart', url: `${baseUrl}/chart/area?data=1,2,3,4,3,2,1&color=0000ff` },
      { name: 'Red Area Transparent Chart', url: `${baseUrl}/chart/area?data=1,2,6,4,10,7,4,5,2,9,8&color=f00&opacity=0.2` },
      { name: 'Green Area Transparent Chart', url: `${baseUrl}/chart/area?data=5,1,2,9,8,3,0,0,4&color=00ff00&opacity=0.2` },
      { name: 'Blue Area Transparent Chart', url: `${baseUrl}/chart/area?data=1,2,3,4,3,2,1&color=0000ff&opacity=0.2` }
    ]
  }, {
    name: 'Area Spline',
    examples: [
      { name: 'Red Area Spline Chart', url: `${baseUrl}/chart/areaspline?data=1,2,6,4,10,7,4,5,2,9,8&color=f00` },
      { name: 'Green Area Spline Chart', url: `${baseUrl}/chart/areaspline?data=5,1,2,9,8,3,0,0,4&color=00ff00` },
      { name: 'Blue Area Spline Chart', url: `${baseUrl}/chart/areaspline?data=1,2,3,4,3,2,1&color=0000ff` }
    ]
  }, {
    name: 'Bar',
    examples: [
      { name: 'Red Bar Chart', url: `${baseUrl}/chart/bar?data=1,2,6,4,10,7,4,5,2,9,8&color=f00` },
      { name: 'Green Bar Chart', url: `${baseUrl}/chart/bar?data=5,1,2,9,8,3,0,0,4&color=00ff00` },
      { name: 'Blue Bar Chart', url: `${baseUrl}/chart/bar?data=1,2,3,4,3,2,1&color=0000ff` }
    ]
  }, {
    name: 'Column',
    examples: [
      { name: 'Red Column Chart', url: `${baseUrl}/chart/column?data=1,2,6,4,10,7,4,5,2,9,8&color=f00` },
      { name: 'Green Column Chart', url: `${baseUrl}/chart/column?data=5,1,2,9,8,3,0,0,4&color=00ff00` },
      { name: 'Blue Column Chart', url: `${baseUrl}/chart/column?data=1,2,3,4,3,2,1&color=0000ff` }
    ]
  }, {
    name: 'Line',
    examples: [
      { name: 'Red Line Chart', url: `${baseUrl}/chart/line?data=1,2,6,4,10,7,4,5,2,9,8&color=f00` },
      { name: 'Green Line Chart', url: `${baseUrl}/chart/line?data=5,1,2,9,8,3,0,0,4&color=00ff00` },
      { name: 'Blue Line Chart', url: `${baseUrl}/chart/line?data=1,2,3,4,3,2,1&color=0000ff` }
    ]
  }, {
    name: 'Spline',
    examples: [
      { name: 'Red Spline Chart', url: `${baseUrl}/chart/spline?data=1,2,6,4,10,7,4,5,2,9,8&color=f00` },
      { name: 'Green Spline Chart', url: `${baseUrl}/chart/spline?data=5,1,2,9,8,3,0,0,4&color=00ff00` },
      { name: 'Blue Spline Chart', url: `${baseUrl}/chart/spline?data=1,2,3,4,3,2,1&color=0000ff` }
    ]
  }, {
    name: 'Advanced Configuration',
    examples: [
      { name: 'Line 1 (with axes)', url: `${baseUrl}/chart/line?bg=fff&raw={"chart":{"type":"line","margin":null},"title":{"text":"Monthly%20Average%20Temperature"},"subtitle":{"text":"Source:%20WorldClimate.com"},"xAxis":{"visible":true,"categories":["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]},"yAxis":{"visible":true,"title":{"text":"Temperature%20(°C)"}},"legend":{"enabled":true},"plotOptions":{"line":{"dataLabels":{"enabled":true},"enableMouseTracking":false}},"series":[{"name":"Tokyo","data":[7,6.9,9.5,14.5,18.4,21.5,25.2,26.5,23.3,18.3,13.9,9.6]},{"name":"London","data":[3.9,4.2,5.7,8.5,11.9,15.2,17,16.6,14.2,10.3,6.6,4.8]}]}` },
      { name: 'Line 1 (without axes)', url: `${baseUrl}/chart/line?bg=fff&raw={"chart":{"type":"line"},"title":{"text":"Monthly%20Average%20Temperature"},"subtitle":{"text":"Source:%20WorldClimate.com"},"xAxis":{"categories":["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]},"yAxis":{"title":{"text":"Temperature%20(°C)"}},"legend":{"enabled":true},"plotOptions":{"line":{"dataLabels":{"enabled":true},"enableMouseTracking":false}},"series":[{"name":"Tokyo","data":[7,6.9,9.5,14.5,18.4,21.5,25.2,26.5,23.3,18.3,13.9,9.6]},{"name":"London","data":[3.9,4.2,5.7,8.5,11.9,15.2,17,16.6,14.2,10.3,6.6,4.8]}]}` },
      { name: 'Bubble 1 (with axes)', url: `${baseUrl}/chart/bubble?raw={"chart":{"type":"bubble","margin":null,"plotBorderWidth":1,"zoomType":"xy"},"legend":{"enabled":false},"title":{"text":"Sugar%20and%20fat%20intake%20per%20country"},"xAxis":{"visible":true,"gridLineWidth":1,"title":{"text":"Daily%20fat%20intake"},"labels":{"format":"{value}%20gr"},"plotLines":[{"color":"black","dashStyle":"dot","width":2,"value":65,"label":{"rotation":0,"y":15,"style":{"fontStyle":"italic"},"text":"Safe%20fat%20intake%2065g/day"},"zIndex":3}]},"yAxis":{"visible":true,"startOnTick":false,"endOnTick":false,"title":{"text":"Daily%20sugar%20intake"},"labels":{"format":"{value}%20gr"},"maxPadding":0.2,"plotLines":[{"color":"black","dashStyle":"dot","width":2,"value":50,"label":{"align":"right","style":{"fontStyle":"italic"},"text":"Safe%20sugar%20intake%2050g/day","x":-10},"zIndex":3}]},"plotOptions":{"series":{"dataLabels":{"enabled":true,"format":"{point.name}"}}},"series":[{"data":[{"x":95,"y":95,"z":13.8,"name":"BE","country":"Belgium"},{"x":86.5,"y":102.9,"z":14.7,"name":"DE","country":"Germany"},{"x":80.8,"y":91.5,"z":15.8,"name":"FI","country":"Finland"},{"x":80.4,"y":102.5,"z":12,"name":"NL","country":"Netherlands"},{"x":80.3,"y":86.1,"z":11.8,"name":"SE","country":"Sweden"},{"x":78.4,"y":70.1,"z":16.6,"name":"ES","country":"Spain"},{"x":74.2,"y":68.5,"z":14.5,"name":"FR","country":"France"},{"x":73.5,"y":83.1,"z":10,"name":"NO","country":"Norway"},{"x":71,"y":93.2,"z":24.7,"name":"UK","country":"United%20Kingdom"},{"x":69.2,"y":57.6,"z":10.4,"name":"IT","country":"Italy"},{"x":68.6,"y":20,"z":16,"name":"RU","country":"Russia"},{"x":65.5,"y":126.4,"z":35.3,"name":"US","country":"United%20States"},{"x":65.4,"y":50.8,"z":28.5,"name":"HU","country":"Hungary"},{"x":63.4,"y":51.8,"z":15.4,"name":"PT","country":"Portugal"},{"x":64,"y":82.9,"z":31.3,"name":"NZ","country":"New%20Zealand"}]}]}` },
      { name: 'Bubble 1 (without axes)', url: `${baseUrl}/chart/bubble?raw={"chart":{"type":"bubble","plotBorderWidth":1,"zoomType":"xy"},"legend":{"enabled":false},"title":{"text":"Sugar%20and%20fat%20intake%20per%20country"},"xAxis":{"gridLineWidth":1,"title":{"text":"Daily%20fat%20intake"},"labels":{"format":"{value}%20gr"},"plotLines":[{"color":"black","dashStyle":"dot","width":2,"value":65,"label":{"rotation":0,"y":15,"style":{"fontStyle":"italic"},"text":"Safe%20fat%20intake%2065g/day"},"zIndex":3}]},"yAxis":{"startOnTick":false,"endOnTick":false,"title":{"text":"Daily%20sugar%20intake"},"labels":{"format":"{value}%20gr"},"maxPadding":0.2,"plotLines":[{"color":"black","dashStyle":"dot","width":2,"value":50,"label":{"align":"right","style":{"fontStyle":"italic"},"text":"Safe%20sugar%20intake%2050g/day","x":-10},"zIndex":3}]},"plotOptions":{"series":{"dataLabels":{"enabled":true,"format":"{point.name}"}}},"series":[{"data":[{"x":95,"y":95,"z":13.8,"name":"BE","country":"Belgium"},{"x":86.5,"y":102.9,"z":14.7,"name":"DE","country":"Germany"},{"x":80.8,"y":91.5,"z":15.8,"name":"FI","country":"Finland"},{"x":80.4,"y":102.5,"z":12,"name":"NL","country":"Netherlands"},{"x":80.3,"y":86.1,"z":11.8,"name":"SE","country":"Sweden"},{"x":78.4,"y":70.1,"z":16.6,"name":"ES","country":"Spain"},{"x":74.2,"y":68.5,"z":14.5,"name":"FR","country":"France"},{"x":73.5,"y":83.1,"z":10,"name":"NO","country":"Norway"},{"x":71,"y":93.2,"z":24.7,"name":"UK","country":"United%20Kingdom"},{"x":69.2,"y":57.6,"z":10.4,"name":"IT","country":"Italy"},{"x":68.6,"y":20,"z":16,"name":"RU","country":"Russia"},{"x":65.5,"y":126.4,"z":35.3,"name":"US","country":"United%20States"},{"x":65.4,"y":50.8,"z":28.5,"name":"HU","country":"Hungary"},{"x":63.4,"y":51.8,"z":15.4,"name":"PT","country":"Portugal"},{"x":64,"y":82.9,"z":31.3,"name":"NZ","country":"New%20Zealand"}]}]}` },
      { name : 'Pie 1', url: `${baseUrl}/chart/pie?raw={"chart":{"plotBackgroundColor":null,"plotBorderWidth":null,"plotShadow":false,"type":"pie"},"title":{"text":"Browser%20market%20shares%20January,%202015%20to%20May,%202015"},"plotOptions":{"pie":{"allowPointSelect":true,"cursor":"pointer","dataLabels":{"enabled":false},"showInLegend":true}},"series":[{"name":"Brands","colorByPoint":true,"data":[{"name":"Microsoft%20Internet%20Explorer","y":56.33},{"name":"Chrome","y":24.03,"sliced":true,"selected":true},{"name":"Firefox","y":10.38},{"name":"Safari","y":4.77},{"name":"Opera","y":0.91},{"name":"Proprietary%20or%20Undetectable","y":0.2}]}]}` },
    ]
  }
]
