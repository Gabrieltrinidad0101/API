import UserApp from '../application/user'
import { customFecth } from '../../../share/infranstruture/dependencies'
export const userApp = new UserApp(customFecth)
