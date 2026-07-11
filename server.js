// dot env 
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const path = require("path");
const ejsmate = require("ejs-mate");
const Admin = require("./models/admin");
app.engine("ejs", ejsmate);
// Serve Bootstrap static files from node_modules
app.use("/bootstrap", express.static(path.join(__dirname, "node_modules/bootstrap/dist")));

app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//Express Session and mongo-store session storing on cloud
const session = require("express-session");
const {MongoStore} = require('connect-mongo');
const store = MongoStore.create({
    mongoUrl: process.env.MONGODBURL,
    crypto: {
        secret: process.env.SECRETCODE
    },
    touchAfter: 24 * 3600
});
const options={
  store:store,
secret:process.env.SECRETCODE,
  resave: false,
  saveUninitialized: true,
     cookie:{
       expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      maxAge: 7*24*60*60*1000,
}
};
app.use(session(options));

//mongoose
const mongoose = require('mongoose');
// const mongoUrl= "mongodb://127.0.0.1:27017/portfolio";
const mongoUrl= process.env.MONGODBURL;
mongoose.connect(mongoUrl)
  .then(() => console.log('Connected!'));

//Authentication and Authorization
const passport = require("passport");
const LocalStartegy = require("passport-local");
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStartegy(Admin.authenticate()));
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());

// methode override
const methodOverride= require("method-override");
app.use(methodOverride("_method"));

//Setuping connect-flash
const flash = require("connect-flash");
app.use(flash());

app.use((req,res,next)=>{
  res.locals.user= req.user;
  res.locals.success= req.flash("success");
  res.locals.error= req.flash("error");
  next();
});





app.get("/", (req, res) => {
    res.render("home");
});
const resume = require("./routes/resume");
app.use("/resume", resume);
const admin = require("./routes/admin");
app.use("/admin", admin);
const projects = require("./routes/projects");
app.use("/projects", projects);

const messages = require("./routes/contactme");
app.use("/contactme", messages);

//Error Handling
const ExpressError = require("./utlis/ExpressError");
app.use((req,res,next)=>{
    next(new ExpressError("Page not Found",404));
});

app.use((err,req,res,next)=>{
    let{status=500,message="Something went wrong "}= err;
    res.status(status).render("error.ejs",{message});
});



const PORT = 3000;

app.listen(PORT ,()=>{
  console.log("server is running at port 3000");
});

