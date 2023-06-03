
export default interface IDashboard<T> {
  header: T
  menu: T
  main: T
}

export interface IDashboardState {
  miniMenu?: boolean
  hideMenu?: boolean
}

export interface IDashboardContext {
  dashboardState: IDashboardState
  setDashboardState: (dashboard: IDashboardState) => void
}
