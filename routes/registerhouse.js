require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { RegisterHouse } = require("../models/registerhouseschema");
const multer = require("multer");

const router = express.Router();

router.use(bodyParser.urlencoded({extended:false}))
router.use(bodyParser.json());


const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if(file.fieldname === "houseImage"){
      cb(null, "./public/housePhoto");
    }
    if(file.fieldname === "proofOfOwnership"){
      cb(null, "./public/proof")
    }
  },

  filename:(req,file,cb)=>{
     if (file.fieldname === "houseImage") {
        cb(null, file.fieldname+Date.now()+path.extname(file.originalname));
    }
    if(file.fieldname === "proofOfOwnership"){
      cb(null, file.fieldname+Date.now()+path.extname(file.originalname));
    }
  },
}); 


const upload = multer({
  storage: multerStorage,
})


const cpUpload = upload.fields([{name:"houseImage", maxCount: 1},{name:"proofOfOwnership", maxCount: 1}])

router.post('/api/uploadFile', cpUpload , async function(req, res, next){
try{
  const {nameOfOwner,houseNumber,street,LGA,state,} = req.body;
  if (!req.files){
   return  res.status(404).json("Please upload a file")
  }else{
    const newHouseRegistration = new RegisterHouse({
      nameOfOwner: nameOfOwner,
      houseNumber: houseNumber,
      street: street,
      LGA: LGA,
      state: state,
      houseImg :  req.files["houseImage"][0].path,
      proofOfOwnership: req.files["proofOfOwnership"][0].path
    });

    const saveHouse = await newHouseRegistration.save();
      if (!saveHouse){
        return res.status(404).json({
          Error:"Unable to resgister a house"
        })
      }else{
       return res.status(200).json({
        Message:"Successfully registerd a house",
       })
     }
    
  }
  
} catch(error){
  console.log(error)
     return res.status(500).json({error:"An error occured"})
  }
  // next()
})

module.exports = router;
