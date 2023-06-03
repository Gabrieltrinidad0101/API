import { customFecth, Toast } from '../../../share/infranstruture/dependencies'
import InstancesApp from '../application/instanceApp'
import EditorApp from '../../Instance/application/instanceApp'

const editorApp = new EditorApp({
  customFecth,
  toast: Toast
})

export const instanceApp =  new InstancesApp(editorApp, Toast, customFecth)
