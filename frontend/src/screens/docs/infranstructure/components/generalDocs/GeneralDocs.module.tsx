import React from 'react'
import ReactJson from 'react-json-view'
import GeneralDocsCss from './GeneralDocs.module.css'
export default function GeneralDocs (): JSX.Element {
  return (
    <div className={GeneralDocsCss.container}>
      <div>
        <div className={GeneralDocsCss.header}>
          <h2>Send Message</h2>
          <div className={GeneralDocsCss.containerUrl}>
            <span className={GeneralDocsCss.POST}>POST</span>
            <span className={GeneralDocsCss.url}>
              /{'{instanceId}'}/message/chat
            </span>
          </div>
        </div>
        <div>
          <ReactJson name={null} src={{
            token: 'string',
            body: 'string',
            to: 'string'
          }} theme='apathy' />
        </div>
      </div>
      <div>
        <div className={GeneralDocsCss.header}>
          <h2>Send Document</h2>
          <div className={GeneralDocsCss.containerUrl}>
            <span className={GeneralDocsCss.POST}>POST</span>
            <span className={GeneralDocsCss.url}>
              /{'{instanceId}'}/message/document
            </span>
          </div>
        </div>
        <div>
          <ReactJson name={null} src={{
            token: 'string',
            to: 'string',
            filename: 'string',
            document: 'url'
          }} theme='apathy' />
        </div>
      </div>
    </div>
  )
}
