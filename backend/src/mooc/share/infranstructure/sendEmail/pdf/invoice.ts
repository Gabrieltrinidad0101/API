import { type IInvoice } from '../../../domain/email'
import fs from 'fs'
import PDFDocument from 'pdfkit'
import constantes from '../../Constantes'

function createInvoice (invoice: IInvoice, path: string): void {
  const doc = new PDFDocument({ size: 'A4', margin: 50 })
  generateHeader(doc)
  generateCustomerInformation(doc, invoice)
  generateInvoiceTable(doc, invoice)
  doc.end()
  doc.pipe(fs.createWriteStream(path))
}

function generateHeader (doc: PDFKit.PDFDocument): void {
  doc
    .image('/home/gabriel/Desktop/javascript/chatPlus/frontend/src/assets/images/logo.png', 50, 45, { width: 190 })
    .fillColor('#444444')
    .fontSize(10)
    .text(constantes.COMPANY_NAME, 200, 50, { align: 'right' })
    .text('123 Main Street', 200, 65, { align: 'right' })
    .text('New York, NY, 10025', 200, 80, { align: 'right' })
    .moveDown()
}

function generateCustomerInformation (doc: PDFKit.PDFDocument, invoice: IInvoice): void {
  doc
    .fillColor('#444444')
    .fontSize(20)
    .text('Invoice', 50, 160)

  generateHr(doc, 185)

  const customerInformationTop = 200

  doc
    .fontSize(10)
    .text('Invoice Number:', 50, customerInformationTop)
    .font('Helvetica-Bold')
    .text(invoice.invoice_nr.toString(), 150, customerInformationTop)
    .font('Helvetica')
    .text('Invoice Date:', 50, customerInformationTop + 15)
    .text(formatDate(new Date()), 150, customerInformationTop + 15)
    .text('Balance Due:', 50, customerInformationTop + 30)
    .text(
      formatCurrency(invoice.subtotal - invoice.paid),
      150,
      customerInformationTop + 30
    )

    .font('Helvetica-Bold')
    .text(invoice.shipping.name, 300, customerInformationTop)
    .font('Helvetica')
    .text(invoice.shipping.address, 300, customerInformationTop + 15)
    .text(
      invoice.shipping.city +
        ', ' +
        invoice.shipping.state +
        ', ' +
        invoice.shipping.country,
      300,
      customerInformationTop + 30
    )
    .moveDown()

  generateHr(doc, 252)
}

function generateInvoiceTable (doc: PDFKit.PDFDocument, invoice: IInvoice): void {
  const invoiceTableTop = 330

  doc.font('Helvetica-Bold')
  generateTableRow(
    doc,
    invoiceTableTop,
    'Item',
    'Description',
    'Unit Cost',
    'Quantity',
    'Line Total'
  )
  generateHr(doc, invoiceTableTop + 20)
  doc.font('Helvetica')

  for (let i = 0; i < invoice.items.length; i++) {
    const item = invoice.items[i]
    const position = invoiceTableTop + (i + 1) * 30
    generateTableRow(
      doc,
      position,
      item.item,
      item.description,
      formatCurrency(item.amount / item.quantity),
      item.quantity.toString(),
      formatCurrency(item.amount)
    )

    generateHr(doc, position + 20)
  }

  const subtotalPosition = invoiceTableTop + (invoice.items.length) * 30
  generateTableRow(
    doc,
    subtotalPosition,
    '',
    '',
    'Subtotal',
    '',
    formatCurrency(invoice.subtotal)
  )

  const paidToDatePosition = subtotalPosition + 20
  generateTableRow(
    doc,
    paidToDatePosition,
    '',
    '',
    'Paid To Date',
    '',
    formatCurrency(invoice.paid)
  )

  const duePosition = paidToDatePosition + 25
  doc.font('Helvetica-Bold')
  generateTableRow(
    doc,
    duePosition,
    '',
    '',
    'Balance Due',
    '',
    formatCurrency(invoice.subtotal - invoice.paid)
  )
  doc.font('Helvetica')
}

function generateTableRow (
  doc: PDFKit.PDFDocument,
  y: number,
  item: string,
  description: string,
  unitCost: string,
  quantity: string,
  lineTotal: string
): void {
  doc
    .fontSize(10)
    .text(item, 50, y)
    .text(description, 150, y)
    .text(unitCost, 280, y, { width: 90, align: 'right' })
    .text(quantity, 370, y, { width: 90, align: 'right' })
    .text(lineTotal, 0, y, { align: 'right' })
}

function generateHr (doc: PDFKit.PDFDocument, y: number): void {
  doc
    .strokeColor('#aaaaaa')
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke()
}

function formatCurrency (cents: number): string {
  return '$' + (cents / 100).toFixed(2)
}

function formatDate (date: Date): string {
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  return `${year}/${month}/${day}`
}

const invoice = {
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
}

createInvoice(invoice, './invoice.pdf')
