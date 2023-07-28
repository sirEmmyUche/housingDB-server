require('dotenv').config()
const express = require("express");
const GoogleUser = require("../models/googleschema");
const session = require('express-session');
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const router = express.Router();
const CLIENT_URL = "http://localhost:5173/dashboard"

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
        callbackURL: "http://localhost:3000/auth/google/housingdb",
        userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        console.log(accessToken);
        console.log(refreshToken);
        GoogleUser.findOne({"google.id": profile.id }, (err, foundUser)=>{
          if(err){
            console.log(err)
          }
          if(foundUser){
             return done(null, foundUser);
          }
          if(!foundUser){
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
        })
       
      }
    ));  

router.get("/login/failed", (req,res) => {
    res.status(401).json({
        success:false,
        message: "failure",
    });
});

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Successfully Loged In",
      user: req.user,
    });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});

router.get('/auth/google',passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/auth/google/housingdb',
  passport.authenticate('google', {
    failureRedirect: '/login/failed',
    successRedirect: CLIENT_URL

  }),
);

module.exports = router;
