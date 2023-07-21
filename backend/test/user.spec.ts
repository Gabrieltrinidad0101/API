import app from '../src/app'
import request from 'supertest'
import { carlosUser, emptyUser, pedroUser, pedroUserModify, User } from './obejctMother/user'
import type IUser from '../../share/domain/user'
import Tokens from './helps/tokens'

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
    const newUser = User({ ...pedroUser, typeAuthentication: 'Register' })
    const response = await request(app).post('/user/authentication').send(newUser)
    expect(response.body.message).toBeTruthy()
    expect(response.statusCode).toBe(200)
  })

  test('authentication register carlos user', async () => {
    const registerUser = User({ ...carlosUser, typeAuthentication: 'Register' })
    const response = await request(app).post('/user/authentication').send(registerUser)
    expect(response.body.message).toBeTruthy()
    expect(response.statusCode).toBe(200)
  })

  test('authentication register user exist', async () => {
    const newUser = User({ ...pedroUser, typeAuthentication: 'Register' })
    const response = await request(app).post('/user/authentication').send(newUser)
    expect(response.statusCode).toBe(409)
    expect(response.body.message).toBeTruthy()
  })

  test('authentication login user exist', async () => {
    const user = User(pedroUser)
    const response = await request(app).post('/user/authentication').send(user)
    Tokens.pedroToken = response.body.message as string
    expect(Tokens.pedroToken).toBeTruthy()
    expect(response.statusCode).toBe(200)
  })

  test('authentication verify token', async () => {
    const response = await request(app).get('/user/verifyAuthentication')
      .set({ token: Tokens.pedroToken })
      .send()
    const user = response.body.message as IUser
    expect(response.statusCode).toBe(200)
    expect(user._id).toBeTruthy()
    expect(user.password).toBeUndefined()
    expect({ ...user, password: pedroUser.password }).toEqual({ ...pedroUser, _id: user._id })
  })
})

describe('POST /update', () => {
  test('update user with error', async () => {
    const response = await request(app).put('/user/update')
      .set({ token: Tokens.pedroToken })
      .send(emptyUser)
    expect(response.statusCode).toBe(422)
  })

  test('update user', async () => {
    const response = await request(app).put('/user/update')
      .set({ token: Tokens.pedroToken })
      .send(pedroUserModify)
    expect(response.statusCode).toBe(200)
    expect(response.body.message).toBe('User is updated successfully')
  })

  test('verify user after update', async () => {
    const response = await request(app).get('/user/verifyAuthentication')
      .set({ token: Tokens.pedroToken })
      .send()
    expect(response.body.message._id).toBeTruthy()
    const user = response.body.message as IUser
    expect({ ...user, password: pedroUserModify.password })
      .toEqual({ ...pedroUserModify, _id: user._id })
  })

  test('update user whem email exist', async () => {
    const response = await request(app).put('/user/update')
      .set({ token: Tokens.pedroToken })
      .send(carlosUser)
    expect(response.statusCode).toBe(409)
    expect(response.body.message).toBe('The user exists')
  })
})
