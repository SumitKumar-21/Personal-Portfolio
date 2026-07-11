const express = require("express");
const router= express.Router();
const controller = require("../controller/projects");

router.get("/",controller.renderProjets);

router.get("/viewDetails/:id",controller.viewDetails);
module.exports= router;
