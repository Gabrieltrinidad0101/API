import bcrypt from 'bcrypt'
import type IEncrypt from '../domain/encrypt'

export default class Encrypt implements IEncrypt {
  async enCode (password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
  };

  async validate (text1: string, text2: string): Promise<boolean> {
    return await bcrypt.compare(text1, text2)
  }
}
