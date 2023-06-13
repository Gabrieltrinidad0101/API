export default interface INav<T> {
  text?: string
  to?: string
  children?: T
  icon: T
  onClick?: () => void
}
