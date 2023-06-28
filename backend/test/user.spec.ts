import app from '../src/app'
import request from 'supertest'
import { carlosUser, emptyUser, joseUser, pedroUser, User } from './obejctMother/user'
import type IUser from '../../share/domain/user'

let pedroToken = ''

describe('POST /authentication', () => {
  test('authentication register with error', async () => {
    const newUser = User(emptyUser)
    const response = await request(app).post('/user/authentication').send(
      newUser
    )
    expect(response.statusCode).toBe(422)
  })

  test('authentication login with error', async () => {
    const newUser = User(pedroUser)
    const response = await request(app).post('/user/authentication').send(newUser)
    expect(response.statusCode).toBe(422)
  })

  test('authentication register pedro user ', async () => {
    const newUser = User(pedroUser)
    const response = await request(app).post('/user/authentication').send(newUser)
    expect(response.body.message).toBeTruthy()
    expect(response.statusCode).toBe(200)
  })

  test('authentication register carlos user', async () => {
    const registerUser = User({ ...carlosUser, isRegister: true })
    const response = await request(app).post('/user/authentication').send(registerUser)
    expect(response.body.message).toBeTruthy()
    expect(response.statusCode).toBe(200)
  })

  test('authentication register user exist', async () => {
    const newUser = User({ ...pedroUser, isRegister: true })
    const response = await request(app).post('/user/authentication').send(newUser)
    expect(response.statusCode).toBe(409)
    expect(response.body.message).toBeTruthy()
  })

  test('authentication login user exist', async () => {
    const newUser = User({ isRegister: false })
    const response = await request(app).post('/user/authentication').send(newUser)
    pedroToken = response.body.message
    expect(response.statusCode).toBe(200)
    expect(response.body.message).toBeTruthy()
  })

  test('authentication verify token', async () => {
    const response = await request(app).get('/user/verifyAuthentication')
      .set({ pedroToken })
      .send()
    expect(response.body.message._id).toBeTruthy()
    expect(response.body.message.name).toBe('juan')
  })
})

describe('POST /update', () => {
  test('update user with error', async () => {
    const response = await request(app).put('/user/update')
      .set({ pedroToken })
      .send(emptyUser)
    expect(response.statusCode).toBe(422)
  })

  test('update user', async () => {
    const response = await request(app).put('/user/update')
      .set({ pedroToken })
      .send(joseUser)
    expect(response.statusCode).toBe(200)
    expect(response.body.message).toBe('User is updated successfully')
  })

  test('verify user after update', async () => {
    const response = await request(app).get('/user/verifyAuthentication')
      .set({ pedroToken })
      .send()
    expect(response.body.message._id).toBeTruthy()
    const user = response.body.message as IUser
    expect(User(user)).toEqual({ ...joseUser, _id: user._id })
  })

  test('update user', async () => {
    const response = await request(app).put('/user/update')
      .set({ pedroToken })
      .send(pedroUser)
    expect(response.statusCode).toBe(200)
    expect(response.body.message).toBe('User is updated successfully')
  })

  test('update user with exist email', async () => {
    const response = await request(app).put('/user/update')
      .set({ pedroToken })
      .send(carlosUser)
    expect(response.statusCode).toBe(409)
    expect(response.body.message).toBe('The user exists')
  })
})
