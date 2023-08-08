import { CustomFecth } from './customFecth'
import { Toast } from './toast'
import { serverUrl } from './serverUrl'
import wait from '../../../../share/application/wait'
import LoaderAnimation from './loaderAnimation'

const customFecth = new CustomFecth()
const loaderAnimation = new LoaderAnimation()
export { customFecth, Toast, serverUrl, wait, loaderAnimation }
