
// module.exports.localResponse=(req,res,next)=>{
//     res.locals.user=req.user;
//     res.locals.success= req.flash("success");
//     res.locals.error= req.flash("error");
//     next();
// }

module.exports.isAdmin = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash("error", "Admin Only allowed");
        return res.redirect("/");
    }
    next();
};
