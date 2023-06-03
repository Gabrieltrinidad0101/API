export default interface IInfinitiveScroll<T> {
  next: () => Promise<any>
  children?: T | T[]
  className?: string
}
