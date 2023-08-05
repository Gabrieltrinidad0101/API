import jwt from 'jsonwebtoken'
import constantes from '../../../share/infranstructure/Constantes'
import type IToken from '../domain/token'
export default class JWT implements IToken {
  sign (value: object): string {
    return jwt.sign(value, constantes.ENCRYPT_TOKEN)
  }

  verify<T>(value: string): T | null {
    const res = jwt.verify(value, constantes.ENCRYPT_TOKEN)
    return res as T
  }
}
