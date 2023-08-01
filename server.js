require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
// const User = require("./models/user");
const signuproute = require("./routes/signup");
const loginroute = require("./routes/login");
const googleSignUp = require("./routes/googlesignup");
const houseRegistrationRoute = require("./routes/registerhouse");
const serviceRendered = require("./routes/serviceRendered");
const verifyHouseRoute = require("./routes/verifyhouse");
const path = require("path"); // path is an inbuilt node package

// setting express app
const app = express();

// setting ejs engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


// allowing files to be read by frontend for static (images) files
app.use("/public", express.static('public'))

// setting body-parser
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

// setting cors policy
app.use(
  cors({
    // origin:"*"  this will allow all browser to access this APIs route -- not a good practise
     origin: ["http://localhost:5173","https://house-verification-system.vercel.app/"],
    methods: "GET,POST,PUT,DELETE,PATCH",
    credentials: true,
  })); 

mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGO_URL,{ timeout:30000,debug:true}).then(console.log("connected to DB"));
//useNewUrlParser:true, useUnifiedTopology:true,

const PORT = process.env.PORT || 3000;


//handling routes request
app.get("/", (req, res, next)=>{
  res.status(200).render("index");
  next()
})

app.use("/", serviceRendered)
app.use("/", signuproute)
app.use("/", loginroute)
app.use("/", googleSignUp)
app.use("/", houseRegistrationRoute)
app.use("/", verifyHouseRoute);



// listening to port
app.listen(PORT, ()=>{
    console.log(`it is working on port ${PORT}`)
});
