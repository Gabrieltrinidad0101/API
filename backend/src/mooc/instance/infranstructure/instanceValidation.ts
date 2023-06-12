import Joi from 'joi'
import { type TypeValidation } from '../../share/domain/Validator'

const validator = (schema: Joi.ObjectSchema<any>): TypeValidation =>
  (payload: unknown): string | undefined => {
    const { error } = schema.validate(payload)
    return JSON.stringify(error?.details)
  }

const instanceSchema = Joi.object({
  name: Joi.string().required(),
  status: Joi.string().valid('active', 'pending', 'cancel').required(),
  userId: Joi.string().required()
})

const urlSchema = Joi.object({
  webhookUrl: Joi.string().required()
})

export const instanceValidator = validator(instanceSchema)
export const urlValidator = validator(urlSchema)
