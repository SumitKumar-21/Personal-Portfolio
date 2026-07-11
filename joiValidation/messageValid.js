const Joi = require("joi");
const message = require("../models/message");

module.exports.validateMessageSchema = Joi.object({
    message: Joi.object({
        name: Joi.string().trim().required(),
        email: Joi.string().email().required(),
        message: Joi.string().trim().required(),
        time: Joi.date().empty("").optional()
    }).required()
});
