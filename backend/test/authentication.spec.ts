import app from '../src/app'
import request from 'supertest'
import { User } from './obejctMother/user'
let token = ''

describe('POST /authentication', () => {
  test('authentication register with error', async () => {
    const response = await request(app).post('/authentication').send({
      password: '12345',
      isRegister: true
    })
    expect(response.statusCode).toBe(500)
  })

  test('authentication login with error', async () => {
    const response = await request(app).post('/authentication').send({
      password: '12345',
      isRegister: false
    })
    expect(response.statusCode).toBe(500)
  })

  test('authentication register', async () => {
    const response = await request(app).post('/authentication').send(User({
      isRegister: true
    }))
    expect(response.body.message).toBeTruthy()
    expect(response.statusCode).toBe(200)
  })

  test('authentication register user exist', async () => {
    const response = await request(app).post('/authentication').send(User({
      isRegister: true
    }))
    expect(response.statusCode).toBe(409)
  })

  test('authentication login user exist', async () => {
    const response = await request(app).post('/authentication').send(User({
      isRegister: false
    }))
    token = response.body.message
    expect(response.statusCode).toBe(200)
    expect(response.body.message).toBeTruthy()
  })

  test('authentication verify token', async () => {
    const response = await request(app).get('/verifyAuthentication')
      .set({ token })
      .send()
    expect(response.body.message._id).toBeTruthy()
    expect(response.body.message.name).toBe('juan')
  })
})
