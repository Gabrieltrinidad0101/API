import Joi from 'joi'
import { type TypeInstanceValidation } from '../../share/domain/Validator'

const validator = (schema: Joi.ObjectSchema<any>): TypeInstanceValidation => (payload: unknown): string | undefined => {
  const { error } = schema.validate(payload)
  return JSON.stringify(error?.details)
}

const instanceSchema = Joi.object({
  name: Joi.string().required(),
  status: Joi.string().valid('active', 'pending', 'cancel').required(),
  userId: Joi.string().required()
})

export const instanceValidator = validator(instanceSchema)
