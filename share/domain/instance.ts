import { IHttpStatusCode } from "./httpResult"

export interface IInstanceAuthentication{
    token?: String,
    _id?: string
}

export default interface IInstance  extends IInstanceAuthentication{
    name: String,
    status: String,
    plan: number,
    userId?: String,
    qr?: String
}

export interface SaveInstance extends IHttpStatusCode {
    _id?: string
}

export interface ISearchInstance {
    limit: number
    skip: number
    search: string
}