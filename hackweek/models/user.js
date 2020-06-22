var mongoose = require("mongoose");
var passwordLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    name: String,
    score: Number,
    year: Number,
    password: String
});

UserSchema.plugin(passwordLocalMongoose);

module.exports = mongoose.model("User",UserSchema);