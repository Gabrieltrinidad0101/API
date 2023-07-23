import { TypeRol } from "./user"

export interface IInstanceInitial{
    status: TypeStatusInstance
    name: TypeInstanceName
    userName: string
}

export interface IInstanceQRStatus{
    qr?: string
    status: TypeStatusInstance
}

export type TypeInstanceStart = "start" | "error" | "windowClose"

export type TypeStatusInstance = "pending" | "initial" | "authenticated"

type TypeInstanceName = string

export interface IInstanceAuthentication{
    token: string
    _id: string
}

export default interface IInstance  extends IInstanceAuthentication,IInstanceQRStatus{
    userId?: string
    name: TypeInstanceName
    createdAt?: string
    webhookUrl?: string
    userName?: string
}

export interface ISaveInstance {
    instance?: IInstance
    info: string
}

export interface ILimitSearch{
    limit: number
    skip: number
    search: string
}

export interface ISearchInstance extends ILimitSearch {
    userId: string
    userRol: TypeRol
}