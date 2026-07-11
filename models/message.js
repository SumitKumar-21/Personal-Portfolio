const { default: mongoose } = require("mongoose");
const Schema= mongoose.Schema;

const messageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
    time: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Message", messageSchema);