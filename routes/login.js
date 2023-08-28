require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");


const router = express.Router();

router.use(bodyParser.urlencoded({extended:false}))
router.use(bodyParser.json());

router.post("/login", async(req, res)=>{
  try{
    const {password, email} = req.body;
    const findUser = await User.findOne({email:email});

    if(!findUser){
      return res.status(400).json({
        message:"user not found"
      })
    };

 if(findUser){
   bcrypt.compare(password, findUser.password, function(err, result) {
    if(err){console.log(err)
      return res.status(500).json({Error:"An error occured"})
    };
    if(result === false){
      return res.status(404).json({
        message:"incorrect username and password"})
    };
    if(result===true){
      const payload = {userId:findUser._id, username:findUser.firstName};
      const Token = jwt.sign(payload, process.env.JWT_SECRET,{ expiresIn: '1d' });
      return res.status(200).json({
        token:Token,
        firstName:findUser.firstName,
        message:'successfully signed in',
      })
    }
    
  })
};

  }catch(err){
    console.log(err)
    return res.status(500).json("Internal Serval Error")
  }

})
 

module.exports = router;
