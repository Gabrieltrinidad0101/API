import { customFecth } from '../../../share/infranstruture/dependencies'
import { JsonViewsApp } from '../application/jsonViewsApp'

export const jsonViewsApp = new JsonViewsApp(
  customFecth
)
