const Joi = require("joi");

module.exports.projectSchema = Joi.object({
    project: Joi.object({
        title: Joi.string()
            .trim()
            .required(),

        iframeUrl: Joi.string()
            .uri()
            .allow(""),

        shortDescription: Joi.string()
            .trim()
            .allow(""),

        description: Joi.string()
            .trim()
            .allow(""),

        aiRole: Joi.string()
            .trim()
            .allow(""),

        techStack: Joi.array()
            .items(Joi.string().trim())
            .default([]),

        githubLink: Joi.string()
            .uri()
            .allow(""),

        purpose: Joi.string()
            .trim()
            .allow(""),

        learning: Joi.string()
            .trim()
            .allow(""),

        date: Joi.string()
            .trim()
            .required(),

        status: Joi.array()
    .items(Joi.string().trim())
    .default([])
    .optional(),

    })
        .required()
});