const appName = process.env.APP_NAME || "REST Charts"

export default {
  app: {
    name: appName
  },

  server: {
    isProduction:   process.env.NODE_ENV === 'production',
    port:           process.env.PORT || 8080,
    concurrency:    parseInt(process.env.WEB_CONCURRENCY || 1),
    host:           process.env.HOSTNAME || "http://localhost:8080"
  },

  slack: {
    webhookUrl: process.env.SLACK_WEBHOOK_URL
  },

  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379'
  },

  logger: {
    options: {
      name:   appName,
      level:  process.env.LOGGING_LEVEL || "info",
      stream: process.stdout
    }
  }
}
