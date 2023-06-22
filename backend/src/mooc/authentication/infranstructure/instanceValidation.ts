import Joi from 'joi'
import validator from '../../share/infranstructure/Validator'

const userSignUpSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  cellPhone: Joi.string().required()
})

const userSignInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
})

export const userSignUpValidator = validator(userSignUpSchema)
export const userSignInValidator = validator(userSignInSchema)
