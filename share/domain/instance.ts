import { IHttpStatusCode } from "./httpResult"

export interface IInstanceAuthentication{
    token?: string,
    _id?: string
}

export interface IInstanceQRStatus{
    qr?: string
    status: TypeStatusInstance
}

export type TypeStatusInstance = "pending" | "authenticated"

export default interface IInstance  extends IInstanceAuthentication,IInstanceQRStatus{
    name?: string
    userId?: string
    createdAt?: string
}

export interface SaveInstance extends IHttpStatusCode {
    instance?: IInstance
}

export interface ISearchInstance {
    limit: number
    skip: number
    search: string
}