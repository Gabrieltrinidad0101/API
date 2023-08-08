import express from 'express'
import { authRouter } from './mooc/routes/user/infranstructure/userRouter'
import { instanceRouter } from './mooc/routes/instance/infranstructure/instanceRouter'
import { messageRouter } from './mooc/routes/messages/infranstructure/messagesRouter'
import * as Sentry from '@sentry/node'
import cors from 'cors'
import morgan from 'morgan'
import './database'
import { InititalLogs } from './logs'
import { paymentRouter } from './mooc/routes/payment/infranstructure/paymentRouter'

const app = express()

// Set configuration of logs
InititalLogs(app)

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: '50mb' }))
app.use(cors({ origin: '*' }))
app.use(morgan('dev'))
app.use('/user', authRouter)
app.use(instanceRouter)
app.use(messageRouter)
app.use('/payment', paymentRouter)

// The error handler must be registered before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler())

export default app
