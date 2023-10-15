require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const cookieParser = require('cookie-parser')
const jwt = require("jsonwebtoken");

const router = express.Router();
router.use(cookieParser());

// router.use(bodyParser.urlencoded({extended:false}))
router.use(bodyParser.json());


//handling request using router

router.post("/signup", async (req, res)=>{
    try{
    const {password,firstName,lastName,email}= req.body;
    if(!password &&!firstName &&!email &&!lastName){
        return res.status(400).json({message:"Please provide user details"})
    }
    let salt = await bcrypt.genSalt(10)
    let hashed = await bcrypt.hash(password, salt);
    const user = new User({
        firstName:firstName,
        lastName:lastName,
        email:email,
        password:hashed
    })
    await user.validate();
    const saveUser = await user.save();
    if(!saveUser){
        return res.status(404).json({message: "Unable to sign up"})
    }else{
        return res.status(200).json({message:"successful", token:"LogIn to get token"});
    }
    
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"An error occured"})
    }
    
})

module.exports = router;
