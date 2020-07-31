const Joi = require('@hapi/joi');

// validation with joi for registration
const registerValidation = (data) => {
    const joiSchema = Joi.object({
        name: Joi.string().min(6).required(),
        email:Joi.string().min(6).email().required(),
        password:Joi.string().min(6).required()
    });
    return joiSchema.validate(data);
};

const loginValidation = (data) => {
    const joiSchema = Joi.object({
        email:Joi.string().min(6).email().required(),
        password:Joi.string().min(6).required()
    });
    return joiSchema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;