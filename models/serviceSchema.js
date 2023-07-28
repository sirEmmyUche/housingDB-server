const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
    name: String,
    imgUrl: String,
    brief_desc:String,
    full_description: String
})

const Service = mongoose.model("Service", serviceSchema) 

module.exports = { Service,};