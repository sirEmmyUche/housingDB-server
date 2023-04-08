const mongoose = require("mongoose");

// house registration schema

// const imageSchema = new mongoose.Schema({
//     filename: { type: String, required: true },
//   contentType: { type: String, required: true },
//   size: { type: Number, required: true },
//   uploadDate: { type: Date, required: true },
//   metadata: { type: Object }
// })

// const Img = mongoose.model("Img", imageSchema);


const registerAHouseSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now,
      },
    //   user: {
    //     type: Schema.Types.ObjectId,
    //     ref: ['User', GoogleUserSchema]
    //   },
      
    nameOfOwner:{
        type: String,
        required:[true, "Name of house owner must be included and must match details in supported document"]
    },
    houseNumber: {
        type: Number,
        min: 1,
        max: 15,
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
        require:[true, "please provide documents supporting proof of ownership"]
    }
    
})

const RegisterHouse = mongoose.model("RegisterHouse", registerAHouseSchema);




module.exports = { RegisterHouse, };
//Img  was excluded from the export module. 

// module.exports = mongoose.model("HouseRegistration", registerAHouseSchema)



// 4. Register a house
// Input values: House number, street, LGA, state, Image of house, 
// proof of ownership: name of house owner (documents to backup claims)