import Joi from 'joi'
import {validator} from "../../share/infranstructure/dependecies"

const instanceSchema = Joi.object({
  token: Joi.string().required(),
  _id: Joi.string().required(),
  to: Joi.string().required(),
  body: Joi.string().required()
})

export const instanceValidator = validator(instanceSchema)
