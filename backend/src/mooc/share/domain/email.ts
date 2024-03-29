export interface IEmail {
  send: (sendEmail: ISendEmail) => Promise<void>
}

export interface ISendEmail {
  template: string
  to: string
  subject: string
  file?: IEmailFile
}

export interface IEmailFile {
  filename: string
  path: string
}

interface IShippingAddress {
  name: string
  address: string
  city: string
  state: string
  country: string
  postal_code: number
}

export interface IItem {
  item: string
  description: string
  quantity: number
  amount: number
}

export interface IInvoice {
  shipping: IShippingAddress
  items: IItem[]
  subtotal: number
  paid: number
  invoice_nr: number
}

export interface IGenerateInvoiceTemplate {
  for: string
}

export type TypeGnerateInvoiceTemplate = (generateInvoiceTemplate: IGenerateInvoiceTemplate) => string
