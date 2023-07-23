import Joi from 'joi'
import validator from '../../../share/infranstructure/Validator'

const instanceSchema = Joi.object({
  name: Joi.string().required(),
  status: Joi.string().valid('active', 'pending', 'cancel', 'initial').required(),
  userId: Joi.string().required(),
  userName: Joi.string().required()
})

const urlSchema = Joi.object({
  webhookUrl: Joi.string().required()
})

export const instanceValidator = validator(instanceSchema)
export const urlValidator = validator(urlSchema)
