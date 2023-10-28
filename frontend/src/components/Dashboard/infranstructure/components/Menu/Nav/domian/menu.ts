import { type TypeRol } from '../../../../../../../../../share/domain/user'

export default interface INav<T> {
  text?: string
  to?: string
  children?: T
  icon: T
  rol?: TypeRol
  onClick?: () => void
}
