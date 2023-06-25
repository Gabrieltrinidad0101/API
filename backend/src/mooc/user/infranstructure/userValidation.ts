import Joi from 'joi'
import validator from '../../share/infranstructure/Validator'

const userSignUpSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  cellPhone: Joi.string().required(),
  isRegister: Joi.boolean().required()
})

const userSignInSchema = Joi.object({
  name: Joi.string().allow(''),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  cellPhone: Joi.string().allow(''),
  isRegister: Joi.boolean().required()
})

const updateUserSchema = Joi.object({
  name: Joi.string().allow(''),
  email: Joi.string().email().required(),
  cellPhone: Joi.string().allow('')
})

export const userSignUpValidator = validator(userSignUpSchema)
export const userSignInValidator = validator(userSignInSchema)
export const updateUserValidator = validator(updateUserSchema)
