import Joi from 'joi'
import { validator } from '../../../share/infranstructure/dependecies'

const paymentProductLink = Joi.object({
  href: Joi.string().required(),
  rel: Joi.string().required(),
  method: Joi.string().required()
})

const paymentProduct = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  create_time: Joi.string().required(),
  links: Joi.array().items(paymentProductLink),
  id: Joi.string().required()
})

export const paymentProuductValidator = validator(paymentProduct)
