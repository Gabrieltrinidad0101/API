import Joi from 'joi'
import validator from '../../../share/infranstructure/Validator'

const userSignUpSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  cellPhone: Joi.string().required(),
  rol: Joi.valid('user')
})

const userSignInSchema = Joi.object({
  name: Joi.string().allow(''),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  cellPhone: Joi.string().allow('')
})

const userUpdateSchema = Joi.object({
  _id: Joi.string().required(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  cellPhone: Joi.string().required()
})

export const userSignUpValidator = validator(userSignUpSchema)
export const userSignInValidator = validator(userSignInSchema)
export const userUpdateValidator = validator(userUpdateSchema)
