import type IUser from '../../../../../share/domain/user'
import { createInvoicePdf, email, getGenerateInvoiceTemplate } from '../../share/infranstructure/dependecies'
import { type ISubscriptionEmail } from '../domian/emailSubscription'
import crypto from 'crypto'
import path from 'path'

export class SubscriptionEmail implements ISubscriptionEmail {
  private readonly getInvoicePath = (): string => {
    return path.join(__dirname, `/subscriptionPdf/${crypto.randomUUID()}.pdf`)
  }

  private readonly generatedPdf = (invoiceFilename: string): void => {
    createInvoicePdf({
      shipping: {
        name: 'John Doe',
        address: '1234 Main Street',
        city: 'San Francisco',
        state: 'CA',
        country: 'US',
        postal_code: 94111
      },
      items: [
        {
          item: 'Instance Id',
          description: 'Payment month',
          quantity: 1,
          amount: 2500
        }
      ],
      subtotal: 2500,
      paid: 0,
      invoice_nr: 2500
    }, invoiceFilename)
  }

  send = async (user: IUser): Promise<void> => {
    const invoicePath = this.getInvoicePath()
    this.generatedPdf(invoicePath)
    const template = getGenerateInvoiceTemplate({
      for: user.name
    })
    await email.send({
      subject: 'Invoice is generate',
      to: user.email,
      template,
      file: {
        filename: 'Invoice.pdf',
        path: invoicePath
      }
    })
  }
}
