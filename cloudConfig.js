const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const resumeStorage = cloudinaryStorage({
    cloudinary: cloudinary,

    params: {
        folder: "Portfolio/resumes",

        resource_type: "auto",

        allowed_formats: [
            "png",
            "jpg",
            "jpeg",
            "pdf"
        ]
    }
});

const projectStorage = cloudinaryStorage({
    cloudinary: cloudinary,

    params: {
        folder: "Portfolio/projects",

        resource_type: "auto",

        allowed_formats: [
            "png",
            "jpg",
            "jpeg",
            "webp",
        ]
    }
});
const profilPicStorage = cloudinaryStorage({
    cloudinary: cloudinary,

    params: {
        folder: "Portfolio/resumes",

        resource_type: "auto",

        allowed_formats: [
            "png",
            "jpg",
            "jpeg",
            "webp"
        ]
    }
});

module.exports = {
    cloudinary: cloudinary.v2,
    resumeStorage,projectStorage,profilPicStorage,
};
