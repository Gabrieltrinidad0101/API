import { type IEmail, type ISendEmail } from '../../domain/email'
import nodemailer, { type Transporter } from 'nodemailer'
import type SMTPTransport from 'nodemailer/lib/smtp-transport'
import constantes from '../Constantes'

export class Email implements IEmail {
  send = async (sendEmail: ISendEmail): Promise<void> => {
    const transporter = this.createTransporter()
    await transporter.sendMail({
      from: `From ${constantes.SERVER_EMAIL}`, // sender address
      to: sendEmail.to, // list of receivers
      subject: sendEmail.subject, // Subject line
      html: sendEmail.template, // html body
      attachments: [{
        filename: sendEmail.file?.filename,
        path: sendEmail.file?.path
      }]
    })
  }

  private readonly createTransporter = (): Transporter<SMTPTransport.SentMessageInfo> => {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: constantes.SERVER_EMAIL,
        pass: constantes.SERVER_EMAIL_PASSWORD
      }
    })
    return transporter
  }
}
