export interface IProductFromApi {
  id?: string
  name?: string
  description?: string
  create_time?: string
  links?: ILink[]
}

interface ILink {
  href?: string
  rel?: string
  method?: string
}
