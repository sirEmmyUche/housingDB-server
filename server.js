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
const verifyHouseRoute = require("./routes/verifyhouse");
const path = require("path"); // path is an inbuilt node package

// setting express app
const app = express();

// setting ejs engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(`${__dirname}/public`));

// setting body-parser
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

// allowing cors
app.use(cors()); 

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true, useUnifiedTopology: true });

const PORT = process.env.PORT || 3000;


//handling routes request
app.get("/", (req, res, next)=>{
  res.status(200).render("index");
  next()
})

app.use("/", signuproute)
app.use("/", loginroute)
app.use("/", googleSignUp)
app.use("/", houseRegistrationRoute)
app.use("/", verifyHouseRoute);



// listening to port
app.listen(PORT, ()=>{
    console.log(`it is working on port ${PORT}`)
});


/*
Housing DB backend structure......

*/


