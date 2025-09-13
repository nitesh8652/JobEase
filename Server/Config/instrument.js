// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node";
// import{ nodeProfilingIntegration} from "@sentry/node"
Sentry.init({
  dsn: "https://90e60c7d292bffc8c5dd1578dbe0fd2c@o4510001428234240.ingest.de.sentry.io/4510001449074768",
  integrations: [
    Sentry.mongooseIntegration(),
  ],
  sendDefaultPii: true,
});