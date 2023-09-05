import { type IFecthAlert } from '../../../share/domian/customFecth'
import APIURL from '../../../share/application/Api'
import { type IInvoiceColumn } from '../domian/invoices'
import { type ISubscriptionAndInstance } from '../../../../../share/domain/instance'
import formatDate from '../../../../../share/application/date'
export default class InvoicesApp {
  constructor (private readonly fecthAlert: IFecthAlert) {}
  get = async (): Promise<IInvoiceColumn[] | []> => {
    const invoices = await this.fecthAlert.customFecth.get<ISubscriptionAndInstance[]>(APIURL.getInvoices)
    if (invoices === undefined) {
      return []
    }
    const result = invoices.message?.map<IInvoiceColumn>((invoice): IInvoiceColumn => {
      return {
        id: invoice?.id ?? '',
        instanceId: invoice?.instance[0]._id ?? '',
        paymentDate: formatDate(invoice?.create_time ?? ''),
        instanceName: invoice?.instance[0].name ?? '',
        userName: invoice?.instance[0].userName ?? ''
      }
    }) ?? []
    console.log(result)
    return result
  }
}
