import { type ISearchInstance } from '../../../../share/domain/instance'
const APIURL = {
  restartInstance: (instanceId: string): string => `/${instanceId}/instance/restart`,
  logoutInstance: (instanceId: string): string => `/${instanceId}/instance/logout`,
  saveInstance: ({ skip, limit, search }: ISearchInstance): string => `/get?skip=${skip}&limit=${limit}&search=${search}`,
  saveInstanceName: (instanceId: string) => `/${instanceId}/instance/name`,
  sendMessage: (instanceId: string) => `/${instanceId}/messages/chat`,
  sendDocument: (instanceId: string) => `/${instanceId}/messages/document`,
  saveWebhookUrl: (instanceId: string) => `/${instanceId}/instance/webhookUrl`,
  getQr: (instanceId: string) => `/${instanceId}/instance/qr`,
  updateUser: '/user/update',
  getUsers: 'user/get',
  authentication: '/user/authentication',
  getRealInstanceStatus: (instanceId: string) => `/${instanceId}/instance/realStatus`,
  updatePassword: '/user/updatePassword',
  listPlan: '/payment/listPlan',
  verifySubscription: (subscriptionId: string) => `/payment/sucess?subscription_id=${subscriptionId}`
}

export default APIURL
