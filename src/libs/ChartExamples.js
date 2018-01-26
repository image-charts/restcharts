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
      { name: 'Line 1', url: `${baseUrl}/chart/line?bg=fff&raw={"chart":{"type":"line"},"title":{"text":"Monthly%20Average%20Temperature"},"subtitle":{"text":"Source:%20WorldClimate.com"},"xAxis":{"visible":true,"categories":["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]},"yAxis":{"visible":true,"title":{"text":"Temperature%20(°C)"}},"legend":{"enabled":true},"plotOptions":{"line":{"dataLabels":{"enabled":true},"enableMouseTracking":false}},"series":[{"name":"Tokyo","data":[7,6.9,9.5,14.5,18.4,21.5,25.2,26.5,23.3,18.3,13.9,9.6]},{"name":"London","data":[3.9,4.2,5.7,8.5,11.9,15.2,17,16.6,14.2,10.3,6.6,4.8]}]}` }
    ]
  }
]
