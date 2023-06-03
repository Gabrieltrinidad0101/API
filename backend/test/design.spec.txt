import app from '../src/app'
import request from 'supertest'
import { getToken } from './helps/token'
import './authentication.spec'
import { Design } from './obejctMother/design/design'

let token = ''
let _id = ''

describe('POST /Design', () => {
  test('Save', async () => {
    token = (await getToken()).body.message
    const response = await request(app).post('/design/save')
      .set({
        token
      })
      .send(Design({
        content: 'hola mundo'
      }))
    expect(response.body.message).toBe('Save successfully')
    _id = response.body._id
    expect(_id).toBeTruthy()
    expect(_id.length).toBeGreaterThan(0)
    expect(response.statusCode).toBe(200)
  })

  test('Save With Error', async () => {
    token = (await getToken()).body.message
    const response = await request(app).post('/design/save')
      .set({
        token
      })
      .send()
    expect(response.body.message).toBe('Design content is required')
    expect(response.statusCode).toBe(422)
  })

  test('Find by id', async () => {
    token = (await getToken()).body.message
    const response = await request(app).get(`/design/findById/${_id}`)
      .set({
        token
      })
      .send()
    expect(response.body.message.content).toBe('hola mundo')
    expect(response.statusCode).toBe(200)
  })
})
