import app from '../src/app'
import request from 'supertest'
import './user.spec'
import Tokens from './helps/tokens'
import { Instance1 } from './obejctMother/instance'
import type IInstance from '../../share/domain/instance'
import wait from '../../share/application/wait'
import { whatsAppController } from '../src/mooc/whatsAppControl/infranstructure/dependencies'
import { getScreenId } from '../src/mooc/whatsAppControl/infranstructure/getScreenId'
import { WAState } from 'whatsapp-web.js'
import TestServer from '../testServer/testServer'

let instance: IInstance

const testServer = new TestServer()
testServer.start()

describe('Instance', () => {
  test('POST save with error', async () => {
    const response = await request(app).post('/save')
      .set({ token: Tokens.pedroToken })
      .send({})
    expect(response.statusCode).toBe(422)
    expect(response.body.error).toBeTruthy()
  })

  test('POST save', async () => {
    const response = await request(app).post('/save')
      .set({ token: Tokens.pedroToken })
      .send(Instance1)
    expect(response.statusCode).toBe(200)
    expect(response.body.message).toBe('Instance saved successfully')
    expect(response.body.instance).toBeTruthy()
    instance = response.body.instance
  })

  test('Instance is open', async () => {
    const clientId = getScreenId(instance)
    expect(clientId).toBeTruthy()
    const instanceStatus = await whatsAppController.waitInstanceStatus(instance, WAState.OPENING)
    if (clientId === undefined) return
    expect(instanceStatus).toBe(WAState.OPENING)
  }, 30000)

  test('POST get qr', async () => {
    const response = await request(app).get(`/${instance._id}/instance/qr`)
      .set({
        token: instance.token
      })
      .send()
    const { qr, status } = response.body.message
    expect(response.statusCode).toBe(200)
    expect(qr).toBeTruthy()
    expect(status).toBe('pending')
  })

  test('save webhook url', async () => {
    const response = await request(app).post(`/${instance._id}/instance/webhookUrl`)
      .set({ token: Tokens.pedroToken })
      .send({
        webhookUrl: 'http://localhost:8080/messega'
      })
    expect(response.statusCode).toBe(200)
    expect(response.body.message).toBe('Save Success')
  })

  test('send message', async () => {
    await wait(20000)
    const response = await request(app).post(`/${instance._id}/messages/chat`)
      .send({
        token: instance.token,
        to: '18094436276',
        body: 'hello world'
      })
    expect(response.body.message).toBe('success')
  }, 30000)

  test('get message', async () => {
    console.log(testServer.getMessage())
    expect(1).toBe(1)
  })
})
