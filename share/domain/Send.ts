export interface IToAndData {
    to?: string
    body?: string
    filename?: string
}

export default interface ISend extends  IToAndData {
    _id: string
    token: string
    document?: string 
}