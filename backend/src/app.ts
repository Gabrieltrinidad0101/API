import * as dotenv from 'dotenv'
import express from 'express'
import { authRouter } from './mooc/routes/user/infranstructure/userRouter'
import { instanceRouter } from './mooc/routes/instance/infranstructure/instanceRouter'
import { messageRouter } from './mooc/routes/messages/infranstructure/messagesRouter'
import cors from 'cors'
import morgan from 'morgan'
import './database'
dotenv.config()
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: '50mb' }))
app.use(cors({ origin: '*' }))
app.use(morgan('dev'))
app.use('/user', authRouter)
app.use(instanceRouter)
app.use(messageRouter)
export default app
