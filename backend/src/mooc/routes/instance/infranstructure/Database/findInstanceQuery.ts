import { type ISearchInstance } from '../../../../../../../share/domain/instance'

export const findInstanceQuery = (searchHttp: ISearchInstance): object => {
  const searchQuery: any = {}
  if (searchHttp.search !== '') { searchQuery.name = { $regex: searchHttp.search, $options: 'i' } }
  if (searchHttp.userRol !== 'admin') { searchQuery.userId = searchHttp.userId }
  return searchQuery
}
