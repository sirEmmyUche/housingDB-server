require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const router = express.Router();

// router.use(bodyParser.urlencoded({extended:false}))
router.use(bodyParser.json());


//handling request using router

router.post("/signup", async (req, res)=>{
    const {password,firstName,lastName,email}= req.body;
    try{
    let salt = await bcrypt.genSalt(10)
    let hashed = await bcrypt.hash(password, salt);
    const user = new User({
        firstName:firstName,
        lastName:lastName,
        email:email,
        password:hashed
    })
    user.validate()
    .then(()=>{
        user.save((err)=>{
            if(err){
                console.log(err)
                return res.status(404).json({
                    message: "Unable to sign up"
                })
            }else{
                return res.status(200).json({
                    token:"tet234",
                    message:"signed up successful"
                })
            }
        })
    })
    }catch(err){console.log(err)}
    
})

module.exports = router;
