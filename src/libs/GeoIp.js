import request from 'request'

export default {
  request: request.defaults({ baseUrl: 'http://freegeoip.net' }),

  // example response: {
  //   ip: '50.248.240.73',
  //   country_code: 'US',
  //   country_name: 'United States',
  //   region_code: 'GA',
  //   region_name: 'Georgia',
  //   city: 'Decatur',
  //   zip_code: '30034',
  //   time_zone: 'America/New_York',
  //   latitude: 33.6878,
  //   longitude: -84.2507,
  //   metro_code: 524
  // }
  location(ipAddress) {
    return new Promise((resolve, reject) => {
      this.request.get(`/json/${ipAddress}`, (err, httpResponse, body) => {
        if (err) return reject(err)
        if (httpResponse.statusCode >= 400) return reject(body)

        resolve(JSON.parse(body))
      })
    })
  }
}
