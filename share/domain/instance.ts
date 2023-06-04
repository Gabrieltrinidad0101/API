import { IHttpStatusCode } from "./httpResult"

export interface IInstanceAuthentication{
    token?: String,
    _id?: string
}

export type TypeStatusInstance = "pending" | "authenticated"

export default interface IInstance  extends IInstanceAuthentication{
    name: String,
    status: "pending" | "authenticated",
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