import * as Sentry from '@sentry/node'
import { type Express } from 'express-serve-static-core/index'
import constantes from './mooc/share/infranstructure/Constantes'

export const InititalLogs = (app: Express): void => {
  Sentry.init({
    dsn: constantes.SENTRY_DNS,
    integrations: [
      // enable HTTP calls tracing
      new Sentry.Integrations.Http({
        tracing: true
      }),
      // enable Express.js middleware tracing
      new Sentry.Integrations.Express({
        app
      })
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0 // Capture 100% of the transactions, reduce in production!,
  })

  app.use(Sentry.Handlers.requestHandler())
  app.use(Sentry.Handlers.tracingHandler())
}

export const Logs = {
  Info: (info: string): void => {
    Sentry.captureMessage(info, 'info')
  },

  Warning: (info: string): void => {
    Sentry.captureMessage(info, 'warning')
  },

  Error: (error: string): void => {
    Sentry.captureMessage(error, 'error')
  },

  Exception: (ex: any): void => {
    Sentry.captureException(ex)
  }
}
