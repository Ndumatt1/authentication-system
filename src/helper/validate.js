const Joi = require('joi');

/**
 * Validation rule for userSignup and login
 */

const UserSignUpSchema = Joi.object({
    hos_email: Joi.string().required(),
    password: Joi.string().min(6).required(),
    hos_telephone: Joi.string().required(),
    hos_address: Joi.string().required(),
    hos_name: Joi.string().required()
});

const LoginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).required()
})


module.exports = {
    UserSignUpSchema,
    LoginSchema
}