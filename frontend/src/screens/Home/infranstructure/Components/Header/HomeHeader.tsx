import React from 'react'
import HeaderCss from './HomeHeader.module.css'
import type IHeader from '../../../domian/header'
import type Prop from '../../../../../share/domian/prop'

export default function HomeHeader ({ Prop: header }: Prop<IHeader>): JSX.Element {
  const createNewInstance = (): void => {
    header.createNewInstance()
      .catch((error: unknown) => {
        console.log(error)
      })
  }

  const changeText = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target
    header.setSearchInstance(value)
  }

  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') header.search()
  }

  return (
    <header className={HeaderCss.header}>
      <div className={HeaderCss.search}>
        <input className={HeaderCss.searchInput} name="search" onBlur={header.search} onKeyDown={onEnter} value={header.searchInstance} type="text" onChange={changeText} />
        <i onClick={header.search} className={`${HeaderCss.searchButton} fa-solid fa-magnifying-glass`}></i>
      </div>
      <div className={HeaderCss.containerNewInstance}>
        <button className={HeaderCss.newInstance} onClick={createNewInstance}>
          New Instance
        </button>
      </div>
    </header>
  )
}
