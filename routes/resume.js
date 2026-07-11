const express = require("express");
const router= express.Router();
const controller = require("../controller/resume")

router.get("/", controller.displayResume);
router.get("/view", controller.viewResumePdf);
module.exports= router;