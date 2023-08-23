import { type IFecthAlert } from '../../../share/domian/customFecth'
import APIURL from '../../../share/application/Api'
import { isEmptyNullOrUndefined } from '../../../../../share/application/isEmptyNullUndefiner'

export class PaymentApp {
  constructor (private readonly fetchAlert: IFecthAlert) {}

  verifySubscription = async (subscriptionId: string): Promise<boolean> => {
    const result = await this.fetchAlert.customFecth.get<string>(APIURL.verifySubscription(subscriptionId))
    if (!isEmptyNullOrUndefined(result)) {
      this.fetchAlert.toast.sucess(result?.message ?? '')
    }
    return result === undefined
  }
}
