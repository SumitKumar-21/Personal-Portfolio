const mongoose= require("mongoose");
const Schema = mongoose.Schema;
const Admin = require("./admin");

const resumeFileSchema = new Schema(
    {
        url: String,
        filename: String,
        type: String,
        resourceType: String, 
    },
    { _id: false }
);

const resumeSchema = new Schema({
    admin:{
   type:Schema.Types.ObjectId,
    ref:'Admin',
    },
    resume: resumeFileSchema,
});

module.exports= mongoose.model("resume",resumeSchema);
