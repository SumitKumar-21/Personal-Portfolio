var mongoose = require('mongoose'),
    Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose').default;

var adminSchema = new Schema({});

adminSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Admin', adminSchema);  
