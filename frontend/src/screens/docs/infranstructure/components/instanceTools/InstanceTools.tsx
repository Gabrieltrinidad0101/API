import React from 'react'
import APIURL from '../../../../../share/application/Api'
import { serverUrl } from '../../../../../share/infranstruture/serverUrl'
export default function InstanceTools (): JSX.Element {
  return (
    <div>
      <div>
        <h2>Get Qr</h2>
        <p>url: {serverUrl}{APIURL.getQr('instanceID')}</p>
        <div>
          <pre>
            {`{
  token: string
}`}
          </pre>
        </div>
      </div>
      <div>
        <h2>Send Message</h2>
        <p>url: {serverUrl}{APIURL.getQr('instanceID')} body: token</p>
        <pre>
          {`{
  token: string,
  to?: string,
  body?: string
}`}
        </pre>
      </div>
      <div>
        <h2>Send File</h2>
        <p>url: {serverUrl}{APIURL.getQr('instanceID')}</p>
        <pre>
          {`{
  token: string,
  to: string,
  filename: string
  document: string 
}`
          }
        </pre>
      </div>
    </div>
  )
}
