var mongoose = require("mongoose");

var questionSchema = new mongoose.Schema({
    name: String,
    prompt: String,
    sampleinput1: String,
    sampleoutput1: String,
    sampleinput2: String,
    sampleoutput2: String,
});

module.exports = mongoose.model("Question",questionSchema);