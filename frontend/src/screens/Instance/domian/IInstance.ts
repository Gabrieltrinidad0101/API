import type IInstance from '../../../../../share/domain/instance'

export default interface IInstanceApp {
  save: (instance: IInstance, showSucessAlter?: 'noShowSucessAlter') => Promise<string | undefined>
  findById: (_id: string) => Promise<IInstance | undefined>
}

export interface IInstanceEvents {
  save: () => Promise<void>
  instanceName?: string
  changeName: (name: string) => void
}
