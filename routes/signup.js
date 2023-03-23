require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const router = express.Router();

router.use(bodyParser.urlencoded({extended:false}))
router.use(bodyParser.json());


//handling request using router

router.post("/signup", (req, res)=>{
    let saltRounds = 10;
    const {password, email, firstName, lastName} = req.body;
    
    bcrypt.hash(password, saltRounds, function(err, hash) {
        if (err){
            console.log(err)
        }else{
            const user = new User({
                firstName:firstName,
                lastName: lastName,
                email: email,
                password:hash
            })
            user.validate()
            .then(()=>{
                user.save((err)=>{
                    if(err){
                        res.status(404).json(err)
                    }else{
                        // res.status(200).json("Signup successful") 
                        res.render("home")
                    }
                });
            })
            
          }    
    });
})

module.exports = router;

// 2. Sign up
// First name, last name.
// Username (email)
// Password
// Sign up with google acnt