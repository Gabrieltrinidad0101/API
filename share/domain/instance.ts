import { IHttpStatusCode } from "./httpResult"

export interface IInstanceAuthentication{
    token: string
    _id: string
    userId?: string
}

export interface IInstanceQRStatus{
    qr?: string
    status: TypeStatusInstance
}

export type TypeInstanceStart = "start" | "error" | "windowClose" | "disconnected"

export type TypeStatusInstance = "pending" | "initial" | "authenticated"

export default interface IInstance  extends IInstanceAuthentication,IInstanceQRStatus{
    name?: string
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