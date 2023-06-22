import { IHttpStatusCode } from "./httpResult"

export interface IInstanceInitial{
    status: TypeStatusInstance
    name: TypeInstanceName
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
}

export interface SaveInstance extends IHttpStatusCode {
    instance?: IInstance
}

export interface ISearchInstance {
    limit: number
    skip: number
    search: string
}