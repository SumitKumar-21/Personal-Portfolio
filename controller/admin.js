const passport = require("passport");
const Resume = require("../models/resume");
const { cloudinary } = require("../cloudConfig");
const wrapAsync= require("../utlis/wrapAsync");
const Project = require("../models/projects");

module.exports.adminLogin=(req,res)=>{
res.render("admin/login.ejs");
};

module.exports.passwordAuthenticate= passport.authenticate("local", {failureRedirect: "/admin/login",failureFlash: true,
});
module.exports.adminAuth=(req,res)=>{
req.flash("success","Admin verified");
    res.redirect("/admin/dashboard");
};
 
module.exports.adminLogout=(req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash("success", "Logged out successfully");
    res.redirect("/");
  });
};

module.exports.renderDashboard= wrapAsync( async(req,res)=>{
    let allProjects = await Project.find({});
    res.render("admin/dashboard.ejs",{allProjects});
});

module.exports.uploadResume = wrapAsync( async (req, res) => {
    if (!req.file) {
        req.flash("error", "Please upload a resume file");
        return res.redirect("/admin/dashboard");
    }

    const oldResume = await Resume.findOne({
        admin: req.user._id,
    });

    if (oldResume?.resume?.filename) {
        await cloudinary.uploader.destroy(
            oldResume.resume.filename,
            {
                resource_type:
                    oldResume.resume.resourceType || "image",
            }
        );

        await Resume.findByIdAndDelete(oldResume._id);
    }

    const newResume = new Resume({
        admin: req.user._id,

        resume: {
            url: req.file.secure_url || req.file.url || req.file.path,

            filename: req.file.public_id || req.file.filename,

            type: req.file.mimetype.startsWith("image")
                ? "image"
                : "pdf",

            resourceType:
                req.file.resource_type ||
                (req.file.mimetype === "application/pdf"
                    ? "raw"
                    : "image"),
        },
    });

    await newResume.save();

    req.flash("success", "Resume uploaded successfully");

    res.redirect("/admin/dashboard");
});


module.exports.deleteResume = wrapAsync( async (req, res) => {
    const oldResume = await Resume.findOne({
        admin: req.user._id,
    });

    if (!oldResume) {
        req.flash("error", "No resume found");
        return res.redirect("/admin/dashboard");
    }

    if (oldResume.resume?.filename) {
        await cloudinary.uploader.destroy(
            oldResume.resume.filename,
            {
                resource_type:
                    oldResume.resume.resourceType || "image",
            }
        );
    }

    await Resume.findByIdAndDelete(oldResume._id);

    req.flash("success", "Resume deleted successfully");

    res.redirect("/admin/dashboard");
});

module.exports.renderAddProject=(req,res)=>{
    res.render("admin/addProject.ejs");
};


module.exports.addNewProject= wrapAsync( async(req,res)=>{
      if (!req.file) {
        req.flash("error", "Project thumbnail is required");
        return res.redirect("/admin/addProject");
    }
    let newProject = new Project(req.body.project);
    let url = req.file.secure_url || req.file.url;
let filename = req.file.public_id;
newProject.thumbnail = { url, filename };
    await newProject.save();
    req.flash("success","new Project added");
    console.log("new project added");
    res.redirect("/admin/dashboard");
});

//Edit and delete projects
module.exports.editProject = wrapAsync( async(req,res)=>{
    let {id} = req.params;
    let project = await Project.findById(id);
    res.render("admin/editProject.ejs",{project});
});

module.exports.updateProject = wrapAsync(async (req, res) => {
    const { id } = req.params;

    const updatedProject = await Project.findByIdAndUpdate(
        id,
        { ...req.body.project },
        {
            new: true,
            runValidators: true
        }
    );

    if (!updatedProject) {
        // A new file may already have been uploaded by Multer
        if (req.file) {
            await cloudinary.uploader.destroy(req.file.filename);
        }

        req.flash("error", "Project not found");
        return res.redirect("/admin/dashboard");
    }

    if (req.file) {
        const oldFilename = updatedProject.thumbnail?.filename;

        updatedProject.thumbnail = {
            url: req.file.path,
            filename: req.file.filename
        };

        await updatedProject.save();

        // Delete old image only after MongoDB successfully stores new image data
        if (oldFilename) {
            await cloudinary.uploader.destroy(oldFilename);
        }
    }
    req.flash("success", "Update successful");
    res.redirect("/admin/dashboard");
});

module.exports.deleteProject = wrapAsync(async (req, res) => {
    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project) {
        req.flash("error", "Project not found");
        return res.redirect("/admin/dashboard");
    }

    if (project.thumbnail?.filename) {
        await cloudinary.uploader.destroy(project.thumbnail.filename);
    }

    await Project.findByIdAndDelete(id);

    req.flash("success", "Project deleted successfully");
    res.redirect("/admin/dashboard");
});




