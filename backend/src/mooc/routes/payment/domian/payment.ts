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
  findById: (id: number) => Promise<IProductFromApi | undefined>
  savePlan: (plan: IPlanFromApi) => Promise<void>
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
