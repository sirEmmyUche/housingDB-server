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


router.get("/verifyToken", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      // If the Authorization header is missing, return an error
      return res.status(401).json({ message: "Authorization header missing" });
    }

    // Split the Authorization header into two parts: "Bearer" and the token
    const [bearer, token] = authHeader.split(" ");

    if (bearer !== "Bearer" || !token) {
      // If the header doesn't start with "Bearer" or the token is missing, return an error
      return res.status(401).json({ message: "Invalid Authorization header" });
    }

    // Now, you can verify the token
    const isVerified = jwt.verify(token, process.env.JWT_SECRET, function (
      err,
      decoded
    ) {
      if (err) {
        console.log(err);
        return res
          .status(400)
          .json({ message: "Session Expired, Please Login" });
      }

      const user = {
        username: decoded.username,
        userId: decoded.userId,
      };
      return res.status(200).json(user);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json("Internal Server Error");
  }
});

module.exports = router;


