require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");


const router = express.Router();

router.use(bodyParser.urlencoded({extended:false}))
router.use(bodyParser.json());

router.post("/login", (req, res)=>{
  try{
      const {password, email} = req.body;
      User.findOne({email:email},(err, foundUser)=>{
      if(err){
          // console.log(err)
          return res.status(500).json({Error:"An error occured"})
      }else{
          if(!foundUser){
            return res.status(404).json({
              message:"user not found"
            })
          }
      if(foundUser){
           bcrypt.compare(password, foundUser.password, function(err, result) {
           if(err){
            //  console.log(err)
            return res.status(500).json({Error:"An error occured"})
        } 
        if(result === false){
        return res.status(404).json({
          message:"incorrect username and password"
        })
        }
        if(result===true){
          const payload = {userId:foundUser._id, username:foundUser.firstName}
          const Token = jwt.sign(payload, process.env.JWT_SECRET,{ expiresIn: '1d' },)
        return res.status(200).json({
          message:'successfully signed in',
          token: Token,
          firstName:foundUser.firstName,
        })
        }
      });
      }
  }
})
  }catch(err){
      // console.log(err)
      return res.status(500).json({Error:"An error occured"})
  }
})

module.exports = router;



// 1. LogIn 
// Username (email) 
// Password.