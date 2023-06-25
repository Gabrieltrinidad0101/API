
export default interface IDashboard<T> {
  header: T
  menu: T
  main: T
}

export interface IDashboardState {
  hideMenu?: boolean
}

export interface IDashboardContext {
  dashboardState: IDashboardState
  setDashboardState: (dashboard: IDashboardState) => void
}

export interface IHeader {
  className: string
}

export interface IIAvatar {
  name: string
  width?: number
  height?: number
  onClick?: () => void
}
