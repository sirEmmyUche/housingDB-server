require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
// const bcrypt = require("bcrypt");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

const router = express.Router();

// router.use(bodyParser.urlencoded({extended:false}))
router.use(bodyParser.json());


//handling request using router

router.post("/signup", async (req, res)=>{
    const {password,firstName,lastName,email}= req.body;
    try{
        console.log(password)
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
                    token:false,
                    Error: "Sign Up failed"
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


// try{
//          let saltRounds = 10;
//          bcrypt.hash(req.body.password, saltRounds, function(err, hash){
//         if (err){
//             console.log(err)
//         }else{
//             console.log(hash)
//             const user = new User({
//                 firstName:firstName,
//                 lastName: lastName,
//                 email: email,
//                 password:hash
//             })
//             user.validate()
//             .then(()=>{
//                 user.save((err)=>{
//                     if(err){
//                       return  res.status(404).json({
//                         token:false,
//                         Error:err
//                       })
//                     }else{
//                         //return res.status(200).json("Signup successful") 
//                      return  res.status(200).json({
//                         token:true,
//                         message:"Successfully signed In"
//                      })
//                     }
//                 });
//             })
            
//           }    
//     });
//     }catch(err){console.error(err)}