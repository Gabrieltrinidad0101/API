import fs from 'fs'
import path from 'path'
import { type IGenerateInvoiceTemplate, type TypeGnerateInvoiceTemplate } from '../../domain/email'
import constantes from '../Constantes'

export const getResetPasswordTemplate = (logon: string, linkResetPassword: string): string => {
  const template = fs.readFileSync(path.join(__dirname, '/templatesHtml/resetPassword.html'), 'utf-8')
  const templateWithReplaceData = template
    .replace('{{=Logo=}}', logon)
    .replace('{{=linkResetPassword=}}', linkResetPassword)
  return templateWithReplaceData
}

export const getGenerateInvoiceTemplate: TypeGnerateInvoiceTemplate = (generateInvoiceTemplate: IGenerateInvoiceTemplate): string => {
  const template = fs.readFileSync(path.join(__dirname, '/templatesHtml/subscription.html'), 'utf-8')
  const templateWithReplaceData = template
    .replace('{{=For=}}', generateInvoiceTemplate.for)
    .replace('{{=CompanyName=}}', constantes.COMPANY_NAME)
    .replace('{{=CompanyLink=}}', constantes.COMPANY_LINK)
    .replace('{{=CompanyEmail=}}', constantes.COMPANY_EMAIL)
  return templateWithReplaceData
}
