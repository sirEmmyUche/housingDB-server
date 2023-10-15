require('dotenv').config()
const express = require("express");
const GoogleUser = require("../models/googleschema");
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require("jsonwebtoken");

const router = express.Router();

router.use(cookieParser());

router.use(session({ secret: 'SECRET',
    resave: true,
    saveUninitialized: true 
  }));

router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

  passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "https://housing-84si.onrender.com/auth/google/housingdb",//"http://localhost:3000/auth/google/housingdb",
        userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
      },
      async (accessToken, refreshToken, profile, done) => {
        try{
            // console.log(accessToken, refreshToken, profile);
       const findGoogleUser = await GoogleUser.findOne({"google.id": profile.id })
       if(findGoogleUser){
        return done(null, findGoogleUser)
       }
       if(!findGoogleUser){
        const newGoogleUserSignUp =  new GoogleUser({
          method:"google",
          google:{
            id: profile.id,
            name:profile.displayName,
            email:profile.emails[0].value
          }
        })
        await newGoogleUserSignUp.save();
        return done(null, newGoogleUserSignUp)
       }
       
        }catch(err){
          console.log(err)
        }
       
      }
    ));  

router.get("/login/failed", (req,res) => {
    res.status(401).json({
        success:false,
        message: "failure",
    });
});


router.get('/auth/google',passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/auth/google/housingdb', (req, res, next) => {
  passport.authenticate('google', async(err, user, info) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    
    if (!user) {
      return res.status(401).json({ error: 'Authentication failed' });
    }
    // Authentication successful, user is available in req.user.
    const payload = {userId:user.google.id, username:user.google.name};
    const token =  jwt.sign(payload, process.env.JWT_SECRET,{ expiresIn: '1d' });
    return res.cookie('token', token, {
      httpOnly: false, //setting this to false means it can be read by JS on client end which makes it vulnerable to xsl attack
      secure: process.env.NODE_ENV === "production",
    })
    .redirect("https://house-verification-system.vercel.app/dashboard");
  })(req, res, next);
});


module.exports = router; 

