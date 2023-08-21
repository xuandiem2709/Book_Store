import joi from 'joi'

export const email = joi.string().email({minDomainSegments: 2, tlds: {allow: ['com']}}).required()
export const password = joi.string().min(6).required()
export const name = joi.string().required()
export const phone = joi.string().required()
export const address = joi.string().required()
export const role_code = joi.string().required()