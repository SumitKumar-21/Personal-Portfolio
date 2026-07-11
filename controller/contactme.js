
const Message = require("../models/message");
const wrapAsync= require("../utlis/wrapAsync");

module.exports.renderContactMeForm= (req,res)=>{
    res.render("navTabs/contactme.ejs");
}

module.exports.saveMessage= wrapAsync(async(req,res)=>{
    let info = new Message(req.body.message);
    await info.save();
    req.flash("success","Meassage Sent, Will get you back soon");
    res.redirect("/contactme");
})