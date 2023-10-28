import UserApp from '../application/user'
import { customFecth, Toast } from '../../../share/infranstruture/dependencies'
export const userApp = new UserApp({
  customFecth,
  toast: Toast
})
