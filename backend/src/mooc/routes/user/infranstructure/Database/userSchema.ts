import { Schema, model } from 'mongoose'
const userSchema: Schema = new Schema({
  name: String,
  password: String,
  rol: String,
  status: String,
  email: String,
  cellPhone: String
})

const UserModel = model('user', userSchema)

export { UserModel }
