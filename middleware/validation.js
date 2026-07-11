const { projectSchema } = require("../joiValidation/projectSchemaValidation");
const {validateMessageSchema} = require("../joiValidation/messageValid");

module.exports.validateProject = (req, res, next) => {

    const { error, value } = projectSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true
    });

    if (error) {
        const message = error.details
            .map((element) => element.message)
            .join(", ");

        return res.status(400).send(message);
    }

    req.body = value;

    next();
};


module.exports.validateThumbnail = (req, res, next) => {

    if (!req.file) {
        return res.status(400).send("Project thumbnail is required");
    }

    next();
};

module.exports.validateMessage = (req,res,next)=>{

const { error, value } = validateMessageSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true
    });

    if (error) {
        const message = error.details
            .map((element) => element.message)
            .join(", ");

        return res.status(400).send(message);
    }

    req.body = value;

  next();
}