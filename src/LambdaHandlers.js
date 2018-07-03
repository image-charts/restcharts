import path from 'path'
import pug from 'pug'
import Chart from './routes/0.._chart_[colon]type..all.js'
import Index from './routes/999.._[star]..get.js'

/**
 * Base response HTTP headers
 */
const responseHeaders = {
  'Content-Type': 'image/png',
  'Access-Control-Allow-Origin': '*' //,        // Required for CORS support to work
  // 'Access-Control-Allow-Credentials': true   // Required for cookies, authorization headers with HTTPS
}

/**
 * HTTP response templates
 */
const chartResponses = {
  success: (buffer=null, code=200) => {
    return {
      statusCode: code,
      headers: responseHeaders,
      body: buffer.toString('base64'),
      isBase64Encoded: true
    }
  },
  error: (error) => {
    return {
      statusCode: error.code || 500,
      headers: Object.assign(responseHeaders, { 'Content-Type': 'application/json' }),
      body: JSON.stringify(error)
    }
  }
}

/**
 * These functions are used to handle in incoming Lambda event and process
 * it using the relevant services.
 */
// export default {
module.exports = {
  async home(event) {
    let html
    await Index({}, {
      render(view, obj) {
        html = pug.renderFile(path.join('views', `${view}.pug`), obj)
      }
    })

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'text/html' },
      body: html
    }
  },

  async getChart(event) {
    try {
      let overrideStatusCode = null
      let overrideResponse = {}
      let imageBuffer = null

      let { type, body } = parseApiGatewayEvent(event)

      await Chart({
        params: { type },
        body
      }, {
        status(code) {
          overrideStatusCode = code
          return this
        },

        setHeader(key, val) {
          // noop for now since we hard coded our headers above
          return this
        },

        json(obj) {
          overrideResponse = obj
          return this
        },

        send(data) {
          imageBuffer = data
          return this
        }
      })

      if (overrideStatusCode && overrideStatusCode >= 400)
        return chartResponses.error({ code: overrideStatusCode, error: overrideResponse.error || overrideResponse })

      return chartResponses.success(imageBuffer)

    } catch(err) {
      return chartResponses.error({ code: 500, error: err })
    }
  }
}

function parseApiGatewayEvent(ev) {
  const type = ev.pathParameters.type
  let body
  if (ev.queryStringParameters)
    body = ev.queryStringParameters
  if (ev.body)
    body = ev.body

  return { type, body }
}
