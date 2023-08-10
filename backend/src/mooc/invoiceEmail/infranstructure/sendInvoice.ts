import constantes from '../../share/infranstructure/Constantes'
import { createInvoicePdf, email, getGenerateInvoiceTemplate } from '../../share/infranstructure/dependecies'

export class InvoiceEmail {
  private readonly getInvoicePath = (): string => {
    return `./invoices/${__dirname + crypto.randomUUID()}.pdf`
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

  send = async (): Promise<void > => {
    const invoicePath = this.getInvoicePath()
    this.generatedPdf(invoicePath)
    const template = getGenerateInvoiceTemplate({
      for: 'Test',
      companyLink: 'Test',
      companyName: constantes.COMPANY_NAME,
      pdfLink: 'Test'
    })
    await email.send({
      subject: 'Invoice is generate',
      to: 'gabrielqwes123@gmail.com',
      template,
      file: {
        filename: 'Invoice.pdf',
        path: invoicePath
      }
    })
  }
}
