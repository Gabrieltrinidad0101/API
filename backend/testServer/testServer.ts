import express from 'express'
import type http from 'http'
import { type Message } from 'whatsapp-web.js'
const app = express()

export default class TestServer {
  private message: Message | null = null
  private server: http.Server | null = null
  start = (): void => {
    this.server = app.listen(8080)
    app.get('/messega', (req): void => {
      console.log(req.body)
      this.message = req.body as Message
    })
  }

  getMessage = (): Message | null => this.message

  end = (): void => {
    this.server?.close()
  }
}
