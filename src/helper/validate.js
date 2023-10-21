const Joi = require('joi');

/**
 * Validation rule for userSignup and login
 */

const UserSignUpSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
    username: Joi.string().required()
});

const LoginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).required()
})


module.exports = {
    UserSignUpSchema,
    LoginSchema
}