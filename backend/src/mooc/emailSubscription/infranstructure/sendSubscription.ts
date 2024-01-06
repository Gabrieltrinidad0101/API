import { type IBasicUser } from '../../../../../share/domain/user'

import { Logs } from '../../../logs'
import constantes from '../../share/infranstructure/Constantes'
import { createInvoicePdf, email, getGenerateInvoiceTemplate } from '../../share/infranstructure/dependecies'
import { type ISubscriptionEmail } from '../domian/emailSubscription'
import crypto from 'crypto'
import fs from 'fs'
import path from 'path'

export class SubscriptionEmail implements ISubscriptionEmail {
  private readonly getInvoicePath = (): string => {
    const dir = path.join(__dirname, '/subscriptionPdf/')
    if (!fs.existsSync(dir)) fs.mkdirSync(dir)
    return path.join(__dirname, `/subscriptionPdf/${crypto.randomUUID()}.pdf`)
  }

  private readonly generatedPdf = (invoiceFilename: string, instanceId: string, instanceCreated: Date): void => {
    createInvoicePdf({
      shipping: {
        name: constantes.COMPANY_NAME,
        companyEmail: constantes.COMPANY_EMAIL,
        companyNumber: constantes.COMPANY_NUMBER,
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
      invoice_nr: instanceId,
      date: instanceCreated
    }, invoiceFilename)
  }

  send = async (user: IBasicUser, instanceId: string, instanceCreated: Date): Promise<string | undefined> => {
    try {
      const invoicePath = this.getInvoicePath()
      this.generatedPdf(invoicePath, instanceId, instanceCreated)
      const template = getGenerateInvoiceTemplate({
        for: user.name
      })
      await email.send({
        subject: 'Invoice is generate',
        to: user.email,
        template,
        file: {
          filename: invoicePath,
          path: invoicePath
        }
      })
      return invoicePath
    } catch (error) {
      Logs.Exception(error)
    }
  }
}
