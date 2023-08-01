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
    unique: [true, "Email alraedy exist"] 
},
    password: {
        type: String,
        required: [true, "Please provide a password"]
    },

})

module.exports = mongoose.model("User", userSchema);


// Schema({
//   email: {
//     type: String,
//     requird: true,
//   },
//   otp: {
//     type: String,
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//     index: { expires: 300 },
//     // after 5 mins it get's deleted
//   },
// },
// { timestamps: true })