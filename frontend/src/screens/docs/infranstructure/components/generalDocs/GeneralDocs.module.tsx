import React from 'react'
import ReactJson from 'react-json-view'
export default function GeneralDocs (): JSX.Element {
  return (
    <div>
      <div>
        <div>URL</div>
        <div>
          <ReactJson src={{ a: 1 }} theme='monokai' />
        </div>
      </div>
      <div>
        <div>URL</div>
        <div>
          <ReactJson src={{ a: 1 }} theme='monokai' />
        </div>
      </div>
      <div>
        <div>URL</div>
        <div>
          <ReactJson src={{ a: 1 }} theme='monokai' />
        </div>
      </div>
    </div>
  )
}
