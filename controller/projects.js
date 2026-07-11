const wrapAsync = require("../utlis/wrapAsync");
const Project = require("../models/projects");

module.exports.renderProjets= wrapAsync( async(req,res)=>{
    let projects= await Project.find({});
    res.render("navTabs/projects.ejs",{projects});
});

module.exports.viewDetails= wrapAsync(async(req,res)=>{
    let {id} = req.params;
 let projectDetails = await Project.findById(id);
 res.render("navTabs/viewDetails.ejs",{projectDetails});
});
