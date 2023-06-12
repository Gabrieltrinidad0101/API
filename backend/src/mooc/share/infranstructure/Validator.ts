import type Joi from 'joi'
import { type TypeValidation } from '../domain/Validator'

const validator = (schema: Joi.ObjectSchema<any>): TypeValidation => (payload: unknown): string | undefined => {
  const { error } = schema.validate(payload)
  return JSON.stringify(error?.details)
}

export default validator
