require('dotenv').config()
const express = require("express");
const GoogleUser = require("../models/googleschema");
const session = require('express-session');
const passport = require("passport");
const jwt = require("jsonwebtoken");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const router = express.Router();

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
        callbackURL:"http://localhost:3000/auth/google/callback",
        //"https://housing-84si.onrender.com/auth/google/callback",
        //"http://localhost:5173/auth/google/callback",
        userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
      },
      async (accessToken, refreshToken, profile, done) => {
        try{
            console.log(profile);
        console.log(accessToken);
        console.log(refreshToken);
        const googleUser = await GoogleUser.findOne({"google.id": profile.id });
          if(googleUser){
             return done(null, profile);
          }
          if(!googleUser){
            const newUser = new GoogleUser({
           method:"google",
           google:{
             id: profile.id,
             name:profile.displayName,
             email:profile.emails[0].value
           }
         })
         newUser.save(); 
         return done(null, newUser); 
         } 
        
        }catch(err){
          console.log(err)
        }
       
      }
    ));  


router.post("/login/failed", (req, res) => {
 res.status(401).json({
  message:"unable to authenticate user",
  userIdentified:false
 })
});

router.post('/auth/google',passport.authenticate('google', {scope: ['profile', 'email']}));

router.post('/auth/google/callback',
passport.authenticate('google', {
    failureRedirect: '/login/failed',
    // successRedirect: "http://localhost:5173/dashboard" //'/login/success',
  }),
  (req, res)=>{
    let user = {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    };
    const token = jwt.sign(user, process.env.JWT_SECRET);
    res.status(200).json({ token, user });
  }
);

module.exports = router;
