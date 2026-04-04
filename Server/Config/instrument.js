import * as Sentry from "@sentry/node";

/**
 * @module SentrySetup
 * @desc Initializes Sentry for error monitoring and performance tracking.
 * 
 * @features
 * - Captures runtime errors
 * - Tracks database queries (via mongooseIntegration)
 * - Helps debug production issues
 * 
 * @important
 * - DSN is the unique project identifier from Sentry dashboard
 * - sendDefaultPii: true → captures user-related info (for debugging)
 */

Sentry.init({
  dsn: "https://90e60c7d292bffc8c5dd1578dbe0fd2c@o4510001428234240.ingest.de.sentry.io/4510001449074768",
  integrations: [
    Sentry.mongooseIntegration(),
  ],
  sendDefaultPii: true,
});