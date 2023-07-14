export interface IProductFromApi {
  id?: string
  name?: string
  description?: string
  create_time?: string
  links?: ILink[]
}

export interface IPaymentRepository {
  saveProduct: (product: IProductFromApi) => Promise<void>
  findById: (id: number) => Promise<IProductFromApi>
}

interface ILink {
  href?: string
  rel?: string
  method?: string
}
