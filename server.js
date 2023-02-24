require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const User = require("./models/user");
const HouseRegistration = require("./models/registerhouse");
const loginroute = require("./routes/login");


const app = express();
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use(cors); 

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true});

const PORT = process.env.PORT || 3000;

//handling routes request
app.use("/", loginroute)

app.listen(PORT, ()=>{
    console.log(`it is working on port ${PORT}`)
});


/*
Housing DB backend structure......

1. LogIn 
Username (email) 
Password.

2. Sign up
First name, last name.
Username (email)
Password
Sign up with google acnt

3. Verify a house
Input values: (House number, house address (name of street), LGA, state, country (for now, Nigeria)  
Output: name of house owner, image of house.

4. Register a house
Input values: House number, street, LGA, state, country. Image of house, 
proof of ownership: name of house owner (documents to backup claims)
*/


