import { type IFecthAlert } from '../../../share/domian/customFecth'
import APIURL from '../../../share/application/Api'

export default class InvoicesApp {
  constructor (private readonly fecthAlert: IFecthAlert) {}
  get = async (): Promise<void> => {
    const invoices = await this.fecthAlert.customFecth.get(APIURL.getInvoices)
    console.log(invoices)
  }
}
