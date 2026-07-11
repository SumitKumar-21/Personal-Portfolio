const express = require("express");
const router = express.Router();
const controller= require("../controller/contactme");
const {validateMessage} = require("../middleware/validation");

router.get("/",controller.renderContactMeForm);

router.post("/", validateMessage,controller.saveMessage );

module.exports= router;