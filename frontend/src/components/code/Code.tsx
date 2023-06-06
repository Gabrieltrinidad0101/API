import React from 'react'
import CodeCss from './Code.module.css'
export default function Code (): JSX.Element {
  return (
        <div className={CodeCss.container}>
            <div className={CodeCss.title}>
                <p>Enviar mensaje de prueba por API</p>
                <div>
                    POST
                </div>
            </div>
            <div className={CodeCss.languajes}>
                <div>
                    PHP
                </div>
                <div>
                    Node.js
                </div>
                <div>
                    JavaScript
                </div>
                <div>
                    Python
                </div>
                <div>
                    Curl(Bash)
                </div>
                <div>
                    java
                </div>
                <div>
                    Ruby
                </div>
                <div>
                    VB.NET
                </div>
                <div>
                    C#
                </div>
                <div>
                    Go
                </div>
                <div>
                    C
                </div>
                <div>
                    Clojure
                </div>
                <div>
                    Dart
                </div>
                <div>
                    Swift
                </div>
                <div>
                    Objective-C
                </div>
                <div>
                    Powershell
                </div>
                <div>
                    Shell
                </div>
            </div>
            <div className={CodeCss.codeContainer}>
                <pre>
                    <code className="language-javascript">
                    </code>
                </pre>

            </div>
        </div>
  )
}
