import type Joi from 'joi'
import { type TypeValidation } from '../domain/Validator'

const validator = (schema: Joi.ObjectSchema<any>): TypeValidation => (payload: unknown): any | undefined => {
  const { error } = schema.validate(payload)
  return error?.details
}

export default validator
