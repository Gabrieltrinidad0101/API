import React, { useRef } from 'react'
import type IInfinitiveScroll from '../domian/infinitiveScroll'

let isLoading = false

export default function InfinitiveScroll ({ next, children, className }: IInfinitiveScroll<JSX.Element>): JSX.Element {
  const divScroll = useRef<HTMLDivElement>(null)

  const handleScroll = (): void => {
    if (divScroll.current === null || isLoading) return
    const { scrollTop, scrollHeight, clientHeight } = divScroll.current
    if (scrollHeight === clientHeight || scrollTop + clientHeight < scrollHeight - 100) return
    isLoading = true
    next()
      .then((): void => {
        isLoading = false
      })
      .catch((): void => {
        isLoading = false
      })
  }

  return (
    <div ref={divScroll} onScroll={handleScroll} className={className} >
      {
        children
      }
    </div>
  )
}
