import InvoicesApp from '../application/InvoicesApp'
import { customFecth, Toast } from '../../../share/infranstruture/dependencies'

export const invoicesApp = new InvoicesApp({ customFecth, toast: Toast })
