export interface IEmail {
  send: (sendEmail: ISendEmail) => Promise<void>
}

export interface ISendEmail {
  template: string
  to: string
  subject: string
}
