import React from 'react'
import Page404Css from './Page404.module.css'
export default function Page404 (): JSX.Element {
  return (
        <>
            <div className={Page404Css.body}>
                <div className={`${Page404Css.c}`}>
                    <div className={`${Page404Css._404}`}>404</div>
                    <hr />
                </div>
            </div>
        </>
  )
}
