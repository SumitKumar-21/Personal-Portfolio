const express = require("express");
const router= express.Router();

const controller = require("../controller/admin");
//Uploading to cloud 
const {uploadResume, uploadThumbnail, uploadProfilePic} = require("../multerValidate");

//Authenticatin Middleware
const {isAdmin} = require("../middleware/auth");
const {validateProject,validateThumbnail} = require("../middleware/validation");


router.get("/login",controller.adminLogin);

router.post("/login",controller.passwordAuthenticate,controller.adminAuth);

router.post("/logout",controller.adminLogout);

router.put("/uploadResume",isAdmin, uploadResume.single('resume'),controller.uploadResume);

router.delete("/deleteResume",isAdmin, controller.deleteResume);

router.get("/dashboard",isAdmin,controller.renderDashboard);
router.get("/addProject",isAdmin,controller.renderAddProject);
router.post("/addProject",uploadThumbnail.single("project[thumbnail]"),validateThumbnail,validateProject,controller.addNewProject
);

router.get("/edit/:id",isAdmin,controller.editProject);
router.post("/edit/:id",isAdmin,uploadThumbnail.single("project[thumbnail]"),validateProject,controller.updateProject);
router.get("/delete/:id",isAdmin,controller.deleteProject);


module.exports= router;
