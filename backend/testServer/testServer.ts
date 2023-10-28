import express from 'express'
import type http from 'http'
import { type Message } from 'whatsapp-web.js'
const app = express()

export default class TestServer {
  private message: Message | null = null
  private server: http.Server | null = null
  start = (): void => {
    app.use(express.json({ limit: '50mb' }))
    this.server = app.listen(8080)
    app.post('/messega', (req): void => {
      this.message = req.body as Message
    })
  }

  getMessage = (): Message | null => this.message

  end = (): void => {
    this.server?.close()
  }
}
