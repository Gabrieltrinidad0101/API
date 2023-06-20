import { type TypeStatusInstance } from '../../../../../share/domain/instance'
import type IInstance from '../../../../../share/domain/instance'

export type TypeInstanceStateByComponent<T> = { [key in TypeStatusInstance]: T }

export interface IInstanceStateControl<QrVisulization> {
  instance: IInstance
  qrRef: QrVisulization
}
