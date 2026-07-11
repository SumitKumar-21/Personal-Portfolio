if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const Admin = require("../models/admin");

const mongoUrl = process.env.MONGODBURL;

async function initAdmin() {
  await mongoose.connect(mongoUrl);
  console.log("MongoDB connected");

  const existingAdmin = await Admin.findOne({
    username: process.env.ADMINUSERNAME,
  });

  if (existingAdmin) {
    console.log("Admin already exists");
    await mongoose.connection.close();
    return;
  }

  const admin = new Admin({
    username: process.env.ADMINUSERNAME,
  });

  await Admin.register(admin, process.env.ADMINPASSWORD);

  console.log("Admin created successfully");
  await mongoose.connection.close();
}

initAdmin().catch((err) => {
  console.log(err);
});