export default interface IToken {
  sign: (value: object) => string
  verify: <T>(value: string) => T | null
}
