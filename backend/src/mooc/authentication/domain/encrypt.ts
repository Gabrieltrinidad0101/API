export default interface IEncrypt {
  enCode: (text: string) => Promise<string>
  validate: (text1: string, text2: string) => Promise<boolean>
}
