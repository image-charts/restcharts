const appName = process.env.APP_NAME || "RESTCharts"

export default {
  app: {
    name: appName
  },

  server: {
    isProduction:   process.env.NODE_ENV === 'production',
    port:           process.env.PORT || 8080,
    concurrency:    parseInt(process.env.WEB_CONCURRENCY || 1),
    host:           process.env.HOSTNAME || "http://localhost:8080",
    api_host:       process.env.API_HOSTNAME || "http://localhost:8080"
  },

  logger: {
    options: {
      name:   appName,
      level:  process.env.LOGGING_LEVEL || "info",
      stream: process.stdout
    }
  }
}
