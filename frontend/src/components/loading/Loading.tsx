import React from 'react'
import LoadingCss from "./Loading.module.css"
export default function Loading() {
    return (
        <div id="LoadingFetch" className={LoadingCss.center}>
            <div className={LoadingCss.wave}></div>
            <div className={LoadingCss.wave}></div>
            <div className={LoadingCss.wave}></div>
            <div className={LoadingCss.wave}></div>
            <div className={LoadingCss.wave}></div>
            <div className={LoadingCss.wave}></div>
            <div className={LoadingCss.wave}></div>
            <div className={LoadingCss.wave}></div>
            <div className={LoadingCss.wave}></div>
            <div className={LoadingCss.wave}></div>
        </div>
    )
}
