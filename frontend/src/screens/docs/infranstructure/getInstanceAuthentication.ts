import { type IInstanceAuthentication } from '../../../../../share/domain/instance'

const instanceAuthentication = (): IInstanceAuthentication => {
  return {
    _id: localStorage.getItem('instanceId') ?? '',
    token: localStorage.getItem('instanceToken') ?? ''
  }
}

export default instanceAuthentication
