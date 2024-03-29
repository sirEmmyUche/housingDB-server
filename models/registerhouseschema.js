const mongoose = require("mongoose");

// house registration schema

const registerAHouseSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now,
      },
    nameOfOwner:{
        type: String,
        required:[true, "Name of house owner must be included and must match details in supported document"]
    },
    houseNumber: {
        type: Number,
        required: [true, "Enter house number"]
    },
    street:{
        type: String, 
        required:[true, "Please enter name of street"],
    },
    LGA:{
        type: String,
        required: [true, "Enter LGA"]
    },
    state:{
        type: String,
        required:[true, "State is required"]
    },
    houseImg: {
        type: String,
        required: ["please upload an image"]
        //imageSchema,
    },
    proofOfOwnership:{
        type: String,
        required:[true, "please provide documents supporting proof of ownership"]
    }
    
})

const RegisterHouse = mongoose.model("RegisterHouse", registerAHouseSchema);


module.exports = { RegisterHouse,};
