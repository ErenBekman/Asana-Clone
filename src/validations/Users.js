const Joi = require('joi')

const createValidation = Joi.object({
    full_name: Joi.string().required().min(2),
    password: Joi.string().required().min(2),
    email: Joi.string().email().required().min(2),
})

const loginValidation = Joi.object({
    email: Joi.string().email().required().min(2),
    password: Joi.string().required().min(2),
})

const resetPasswordValidation = Joi.object({
    email: Joi.string().email().required().min(2),
})

const changePasswordValidation = Joi.object({
    password: Joi.string().required().min(2),
})

const updateValidation = Joi.object({
    full_name: Joi.string().min(2),
    email: Joi.string().email().min(2),
})

module.exports = {
    createValidation,
    loginValidation,
    resetPasswordValidation,
    updateValidation,
    changePasswordValidation
}