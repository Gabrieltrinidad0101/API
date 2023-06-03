export default interface IHeader {
  createNewInstance: () => Promise<void>
  searchInstance: string
  setSearchInstance: (searchInstance: string) => void
  search: () => void
}
