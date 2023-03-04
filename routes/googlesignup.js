require('dotenv').config()
const express = require("express");
const User = require("../models/user");
const GoogleStrategy = require('passport-google-oauth20').Strategy;


module.exports = (passport)=>{
    passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/housingdb",
        userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
      },
      function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
          return cb(err, user);
        });
      }
    ));
    
}


