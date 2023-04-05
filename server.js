require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/user");
const signuproute = require("./routes/signup");
const loginroute = require("./routes/login");
const googleSignUp = require("./routes/googlesignup");
const houseRegistrationRoute = require("./routes/registerhouse");

// require("./routes/googlesignup")(passport);

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use(cors()); 

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true, useUnifiedTopology: true });

const PORT = process.env.PORT || 3000;


//handling routes request
app.get("/", (req, res, next)=>{
  res.render("index");
  next()
})

app.use("/", signuproute)
app.use("/", loginroute)
app.use("/", googleSignUp)
app.use("/", houseRegistrationRoute);





// listening to port
app.listen(PORT, ()=>{
    console.log(`it is working on port ${PORT}`)
});


/*
Housing DB backend structure......

3. Verify a house
Input values: (House number, house address (name of street), LGA, state, country (for now, Nigeria)  
Output: name of house owner, image of house.

4. Register a house
Input values: House number, street, LGA, state, country. Image of house, 
proof of ownership: name of house owner (documents to backup claims)
*/


