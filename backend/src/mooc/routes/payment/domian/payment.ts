export interface IProductFromApi {
  _id?: string
  name?: string
  description?: string
  create_time?: string
  links?: ILink[]
  id?: string
}

export interface IPaymentRepository {
  saveProduct: (product: IProductFromApi) => Promise<void>
  findOneProduct: (filter: object) => Promise<IProductFromApi | null>
  savePlan: (plan: IPlanFromApi) => Promise<void>
  findLastPlan: () => Promise<IPlanFromApi>
}

interface ILink {
  href?: string
  rel?: string
  method?: string
}

export interface IPlanFromApi {
  id: string
  product_id: string
  name: string
  status: string
  usage_type: string
  create_time: string
  links: string
}
