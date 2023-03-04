const mongoose = require("mongoose");
var findOrCreate = require('mongoose-findorcreate');

// users schema

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required: [true, "Please provide first name"]
    },

    lastName:{
        type:String,
        required: [true, "Please provide last name"]
    },

    email:{type: String,
    required: [true, "Email field is required"],
    unique: [true, "Email alraedy exist"] 
},
    password: {
        type: String,
        required: [true, "Please provide a password"]
    }
})
userSchema.plugin(findOrCreate);

module.exports = mongoose.model("User", userSchema);