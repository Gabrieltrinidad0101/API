export interface IToAndMessage {
    to?: number
    body?: string
    filename?: string
}

export default interface ISendMessage extends  IToAndMessage {
    _id: string
    token: string
    document?: string 
}