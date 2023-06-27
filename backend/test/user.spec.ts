import app from '../src/app'
import request from 'supertest'
import { User } from './obejctMother/user'
let token = ''

describe('POST /authentication', () => {
  test('authentication register with error', async () => {
    const newUser = User({ name: '', isRegister: true })
    const response = await request(app).post('/user/authentication').send(
      newUser
    )
    expect(response.statusCode).toBe(422)
  })

  test('authentication login with error', async () => {
    const newUser = User({ email: '', isRegister: true })
    const response = await request(app).post('/user/authentication').send(newUser)
    expect(response.statusCode).toBe(422)
  })

  test('authentication register', async () => {
    const newUser = User({ isRegister: true })
    const response = await request(app).post('/user/authentication').send(newUser)
    expect(response.body.message).toBeTruthy()
    expect(response.statusCode).toBe(200)
  })

  test('authentication register user exist', async () => {
    const newUser = User({ isRegister: true })
    const response = await request(app).post('/user/authentication').send(newUser)
    expect(response.statusCode).toBe(409)
    expect(response.body.message).toBeTruthy()
  })

  test('authentication login user exist', async () => {
    const newUser = User({ isRegister: false })
    const response = await request(app).post('/user/authentication').send(newUser)
    token = response.body.message
    expect(response.statusCode).toBe(200)
    expect(response.body.message).toBeTruthy()
  })

  test('authentication verify token', async () => {
    const response = await request(app).get('/user/verifyAuthentication')
      .set({ token })
      .send()
    expect(response.body.message._id).toBeTruthy()
    expect(response.body.message.name).toBe('juan')
  })
})

describe('POST /update', () => {
  test('update user with error', async () => {
    const user = User({ name: 'carlos', password: '' })
    const response = await request(app).put('/user/update')
      .set({ token })
      .send(user)
    expect(response.statusCode).toBe(422)
  })

  test('update user', async () => {
    const user = User({ name: 'pedro', email: 'pedro@gmail.com' })
    const response = await request(app).put('/user/update')
      .set({ token })
      .send(user)
    expect(response.statusCode).toBe(200)
    expect(response.body.message.name).toBe('pedro')
    expect(response.body.message.email).toBe('pedro@gmail.com')
  })
})
