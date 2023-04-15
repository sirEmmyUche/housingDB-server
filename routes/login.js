require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const router = express.Router();

router.use(bodyParser.urlencoded({extended:false}))
router.use(bodyParser.json());

router.post("/login", (req, res)=>{
    try{
        const {password, email} = req.body;
 User.findOne({email:email},(err, foundUser)=>{
    if(err){
        console.log(err)
    }else{
        if(!foundUser){
          return res.status(404).json("User not found")
        }
        if(foundUser){
         bcrypt.compare(password, foundUser.password, function(err, result) {
           if(err){
            console.log(err)
           } 
           if(result === false){
           return res.status(404).json("Incorrect username and password")
           }
           if(result===true){
            // res.status(200).json(foundUser.firstName)
           return res.render("index")
           }
         });
        }
    }
 })
    }catch(err){
        console.log(err)
    }
})

module.exports = router;



// 1. LogIn 
// Username (email) 
// Password.