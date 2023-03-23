const mongoose = require("mongoose");

const googleUserSchema = new mongoose.Schema({
    
google: {
    id:{
        type:String
    },
    name:{
        type:String
    },
    email:{
        type:String,
        unique: [true, "Email alraedy exist"] 
    }
}
})

module.exports = mongoose.model("GoogleUserSchema", googleUserSchema);
