import Joi from 'joi'
import { validator } from '../../../share/infranstructure/dependecies'

const messageSchema = Joi.object({
  token: Joi.string().required(),
  instanceId: Joi.string().required(),
  to: Joi.string().required(),
  body: Joi.string().optional().allow(''),
  document: Joi.string().optional().allow(''),
  filename: Joi.string().optional().allow('')
})

export const messageValidator = validator(messageSchema)
