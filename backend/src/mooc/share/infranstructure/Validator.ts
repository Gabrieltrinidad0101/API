import Joi from 'joi'
import { type TypeInstanceValidation } from '../domain/Validator'

const validator = (schema: Joi.ObjectSchema<any>): TypeInstanceValidation => (payload: unknown): string | undefined => {
    const { error } = schema.validate(payload)
    return JSON.stringify(error?.details)
}

export default validator;