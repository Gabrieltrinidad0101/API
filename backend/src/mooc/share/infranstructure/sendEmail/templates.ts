import fs from 'fs'
import path from 'path'
export const getResetPasswordTemplate = (logon: string, linkResetPassword: string): string => {
  const template = fs.readFileSync(path.join(__dirname, '/templatesHtml/resetPassword.html'), 'utf-8')
  const templateWithReplaceData = template.replace('{{=Logo=}}', logon)
    .replace('{{=linkResetPassword=}}', linkResetPassword)
  return templateWithReplaceData
}
