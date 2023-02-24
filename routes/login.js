require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());


const router = express.Router();

//handling request using router

router.get("/login", (req, res)=>{
    res.status(200).json("it is working")
})


module.exports = router;