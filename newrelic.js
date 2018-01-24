var config = require("./config.js");

'use strict'

/**
 * New Relic agent configuration.
 *
 * See lib/config.defaults.js in the agent distribution for a more complete
 * description of configuration variables and their potential values.
 */
exports.config = {
  /**
   * Array of application names.
   */
  app_name: [ config.app.name ],
  /**
   * Your New Relic license key.
   */
  license_key: config.newrelic.key,
  logging: {
    /**
     * Level at which to log. 'trace' is most useful to New Relic when diagnosing
     * issues with the agent, 'info' and higher will impose the least overhead on
     * production applications.
     */
    level: config.newrelic.level
  },
  /**
   * Whether to collect & submit error traces to New Relic.
   *
   * @env NEW_RELIC_ERROR_COLLECTOR_ENABLED
   */
  error_collector: {
    /**
     * Disabling the error tracer just means that errors aren't collected
     * and sent to New Relic -- it DOES NOT remove any instrumentation.
     */
    enabled: true,
    /**
     * List of HTTP error status codes the error tracer should disregard.
     * Ignoring a status code means that the transaction is not renamed to
     * match the code, and the request is not treated as an error by the error
     * collector.
     *
     * NOTE: This configuration value has no effect on errors recorded using
     * `noticeError()`.
     *
     * Defaults to 404 NOT FOUND.
     *
     * @env NEW_RELIC_ERROR_COLLECTOR_IGNORE_ERROR_CODES
     */
    ignore_status_codes: [],
    /**
     * Whether error events are collected.
     */
    capture_events: true,
    /**
     * The agent will collect all error events up to this number per minute.
     * If there are more than that, a statistical sampling will be collected.
     * Currently this uses a reservoir sampling algorithm.
     *
     * By increasing this setting you are both increasing the memory
     * requirements of the agent as well as increasing the payload to the New
     * Relic servers. The memory concerns are something you should consider for
     * your own server's sake. The payload of events is compressed, but if it
     * grows too large the New Relic servers may reject it.
     */
    max_event_samples_stored: 100
  }
}
