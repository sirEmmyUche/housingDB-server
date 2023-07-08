require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
// const bcrypt = require("bcrypt");
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
          return res.status(404).json({
            message:"user not found"
          })
        }
        if(foundUser){
         bcrypt.compare(password, foundUser.password, function(err, result) {
           if(err){
            console.log(err)
           } 
           if(result === false){
           return res.status(404).json({
            message:"incorrect username and password"
           })
           }
           if(result===true){
            // res.status(200).json(foundUser.firstName)
           return res.status(200).json({
            token:"tokenxyz234",
            message:'successfully signed in',
            firstName:foundUser.firstName,
            lastName:foundUser.lastName
           })
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