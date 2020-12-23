const Joi = require("@hapi/joi")

const standarUserValidation = {
    username: Joi
        .string()
        .min(5)
        .max(18)
        .required()
        .messages({
            'string.empty': `Username field cannot be empty.`,
            'string.min': `Your username should have a minimum length of {#limit} characters.`,
            'string.max': `Your username should have a maximum length of {#limit} characters.`,
            'any.required': `Please enter your username.`
        }),
    password: Joi
        .string()
        .min(6)
        .required()
        .messages({
            'string.empty': `Password field cannot be empty.`,
            'string.min': `Your password should have a minimum length of {#limit} characters.`,
            'any.required': `Please enter your password.`
        }),
}

formatError = ({ error }) => {
    if (error) {
        const { path, message } = error.details[0]
        return { 
            exceptionObject: { 
                [path[0]]: message
            } 
        }
    }
    return { success: true }
}

module.exports.validateRegister = data => {
    const registerSchema = Joi.object({
        ...standarUserValidation,
        password2: Joi.
            string()
            .required()
            .valid(Joi.ref("password"))
            .messages({
                'any.only': `The passwords do not match.`,
                'any.required': `Please enter your password again.`
            })
    })

    return formatError(registerSchema.validate(data))
}

module.exports.validateLogin = data => {
    const registerSchema = Joi.object(standarUserValidation)
    return formatError(registerSchema.validate(data))
}

module.exports.validatePost = data => {
    const postSchema = Joi.object({
        title: Joi.
            string()
            .required()
            .min(10).max(100)
            .messages({
                'any.required': `Title field cannot be empty.`,
                'string.min': `Your title should have a minimum length of {#limit} characters.`,
                'string.max': `Your title should have a maximum length of {#limit} characters.`,
            }),
        body: Joi.
            string()
            .required()
            .min(20).max(280)
            .messages({
                'any.required': `Body field cannot be empty.`,
                'string.min': `The post's body should have a minimum length of {#limit} characters.`,
                'string.max': `The post's body should have a maximum length of {#limit} characters.`,
            })
    })
    return formatError(postSchema.validate(data))
}