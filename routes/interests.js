const express = require("express");
const router= express.Router();
const controller = require("../controller/interest")

router.get("/", controller.renderInterestPage);