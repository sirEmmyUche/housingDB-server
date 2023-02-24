const mongoose = require("mongoose");


// house registration schema
const registerAHouseSchema = new mongoose.Schema({
    nameOfOwner:{
        type: String,
        required:[true, "Name of house owner must be included and must match details in supported document"]
    },
    houseNumber: {
        type: Number,
        min: 1,
        max: 12,
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
    house:{
        houseType: String,
        desc: String,
        img: {
            data: Buffer,
            contentType: String
        }
        
    }
})
                 
module.exports = mongoose.model("HouseRegistration", registerAHouseSchema)





// 4. Register a house
// Input values: House number, street, LGA, state, Image of house, 
// proof of ownership: name of house owner (documents to backup claims)