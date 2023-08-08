import Joi from 'joi'
import { validator } from '../../../share/infranstructure/dependecies'

const paymentProductLink = Joi.object({
  href: Joi.string().required(),
  rel: Joi.string().required(),
  method: Joi.string().required()
})

const paymentProduct = Joi.object({
  create_time: Joi.string().required(),
  status: Joi.string().required(),
  id: Joi.string().required(),
  links: Joi.array().items(paymentProductLink)
})

export const paymentSubscriptionValidator = validator(paymentProduct)
