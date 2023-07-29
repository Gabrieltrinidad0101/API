import APIURL from '../../../share/application/Api'
import type ICustomFecth from '../../../share/domian/customFecth'

export class JsonViewsApp {
  constructor (
    private readonly customFecth: ICustomFecth
  ) { }

  listOfPlan = async (): Promise<object | undefined> => {
    const url = APIURL.listPlan
    return await this.customFecth.get<object>(url)
  }
}
