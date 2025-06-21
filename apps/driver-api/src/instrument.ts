// Import with `const Sentry = require("@sentry/nestjs");` if you are using CJS
import { ForbiddenError } from '@nestjs/apollo';
import { Logger } from '@nestjs/common';
import * as Sentry from '@sentry/nestjs';
import { nodeProfilingIntegration } from '@sentry/profiling-node';
import { config } from 'dotenv';

config({
  path: __dirname + '/.env',
});

Logger.log('Configuring Sentry for Driver API', 'Driver API');
Logger.log('Sentry DSN: ' + process.env.SENTRY_DSN_DRIVER_API, 'Driver API');

Sentry.init({
  dsn: process.env.SENTRY_DSN_DRIVER_API,
  integrations: [nodeProfilingIntegration()],
  tracesSampleRate: 1.0,
  sendDefaultPii: true,
  beforeSend(event, hint) {
    const error = hint.originalException;
    // Don't send ForbiddenError to Sentry
    if (error instanceof ForbiddenError) {
      return null;
    }

    return event;
  },
});
