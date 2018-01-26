import 'babel-polyfill'
import chartRoute from './routes/0.._chart_[colon]type..all.js'

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
const responses = {
  success: (buffer=null, code=200) => {
    return {
      statusCode: code,
      headers: responseHeaders,
      body: buffer
    }
  },
  error: (error) => {
    return {
      statusCode: error.code || 500,
      headers: responseHeaders,
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
  async getChart(event, context, callback) {
    try {
      context.callbackWaitsForEmptyEventLoop = false

      let overrideStatusCode = null
      let overrideResponse = {}
      let imageBuffer = null

      await chartRoute({
        params: { type: event.type },
        body: event
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
        return callback(null, responses.error({ code: overrideStatusCode, error: overrideResponse.error || overrideResponse }))

      callback(null, responses.success(imageBuffer))

    } catch(err) {
      callback(null, responses.error({ code: 500, error: err }))
    }
  }
}
