const multer = require("multer");
const {resumeStorage,profilPicStorage,projectStorage } = require("./cloudConfig");

const fileFilter1 = (req, file, cb) => {

    const allowedTypes = [
        "image/jpeg",
        "image/png",
        "application/pdf"
    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(
            new Error("Only JPG, JPEG, PNG and PDF files are allowed"),
            false
        );
    }
};  
const fileFilter2 = (req, file, cb) => {

    const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/jpg",

    ];

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(
            new Error("Only JPG, JPEG, PNG and Webp files are allowed"),
            false
        );
    }
};


const uploadResume = multer({
    storage:resumeStorage,

    fileFilter1,

    limits: {
        fileSize: 5 * 1024 * 1024
    }
});
const uploadProfilePic = multer({
    storage:profilPicStorage,

    fileFilter2,

    limits: {
        fileSize: 5 * 1024 * 1024
    }
});
const uploadThumbnail = multer({
    storage: projectStorage,
    fileFilter: fileFilter2,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

module.exports = {uploadResume,uploadProfilePic,uploadThumbnail};