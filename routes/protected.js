require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");


const router = express.Router();

router.use(bodyParser.urlencoded({extended:false}))
router.use(bodyParser.json());

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