import InstanceApp from '../application/instanceApp'
import { customFecth, Toast } from '../../../share/infranstruture/dependencies'

export const instanceApp = new InstanceApp({
  customFecth,
  toast: Toast
})
