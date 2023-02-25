require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const router = express.Router();

router.use(bodyParser.urlencoded({extended:false}))
router.use(bodyParser.json());

router.post("/login", (req, res)=>{
 const {password, email} = req.body;
 User.findOne({email:email},(err, foundUser)=>{
    if(err){
        console.log(err)
    }else{
        if(!foundUser){
            res.status(404).json("User not found")
        }
        if(foundUser){
         bcrypt.compare(password, hash, function(err, result) {
           if(err){
            console.log(err)
           } 
           if(result === false){
            res.status(404).json("Incorrect username and password")
           }
           if(result===true){
            res.status(200).json(foundUser.firstName)
           }
         });
        }
    }
 })
})

module.exports = router;



// 1. LogIn 
// Username (email) 
// Password.