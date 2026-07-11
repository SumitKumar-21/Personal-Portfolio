const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },

    iframeUrl: String,

    thumbnail: {
        url: {
            type: String,
            required: true
        },
        filename: {
            type: String,
            required: true
        }
    },
    shortDescription:String,

    description: String,
    aiRole:String,

    techStack: [String],

    githubLink: String,

    purpose: String,

    learning: String,

    date: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
    status:[String]
});

module.exports = mongoose.model("Project", projectSchema);