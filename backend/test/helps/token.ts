import app from '../../src/app'
import request, { type Response } from 'supertest'

export const getToken = async (): Promise<Response> => {
  const response = await request(app).post('/authentication').send({
    name: 'juan',
    password: '1234',
    isRegister: false
  })
  return response
}
