const mongoose = require("mongoose");

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
    unique: true 
},
    password: {
        type: String,
        required: [true, "Please provide a password"]
    }
})

module.exports = mongoose.model("User", userSchema);