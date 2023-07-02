import app from '../src/app'
import request from 'supertest'
import './user.spec'
import Tokens from './helps/tokens'
import { Instance1 } from './obejctMother/instance'
import type IInstance from '../../share/domain/instance'
import wait from '../../share/application/wait'
import { whatsAppController } from '../src/mooc/whatsAppControl/infranstructure/dependencies'
import { getClientId } from '../src/mooc/whatsAppControl/infranstructure/getClientId'
import { WAState } from 'whatsapp-web.js'

let instance: IInstance

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
    const clientId = getClientId(instance)
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

  test('initial instance', async () => {
    await wait(15000)
    const response = await request(app).get(`/${instance._id}/instance/qr`)
      .set({
        token: instance.token
      })
      .send()
    const { status } = response.body.message
    expect(response.statusCode).toBe(200)
    expect(status).toBe('initial')
  }, 30000)
})
