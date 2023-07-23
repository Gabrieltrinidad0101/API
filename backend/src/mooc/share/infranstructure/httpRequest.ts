import request from 'request'
import { isEmptyNullOrUndefined } from '../../../../../share/application/isEmptyNullUndefiner'
import { type IFormatHttpRequest } from '../domain/httpRequest'

export const httpRequet = async (formatHttpRequest: IFormatHttpRequest): Promise<any> =>
  await new Promise((resolve, reject) => {
    request(formatHttpRequest.url, {
      method: formatHttpRequest.method,
      auth: formatHttpRequest.auth,
      body: JSON.stringify(formatHttpRequest.body),
      json: true
    }, (err, res) => {
      if (!isEmptyNullOrUndefined(res)) {
        resolve(res)
      } else {
        reject(err)
      }
    })
  })
