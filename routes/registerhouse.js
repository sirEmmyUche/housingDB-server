require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { RegisterHouse } = require("../models/registerhouseschema");
const multer = require("multer");
// const User = require("./models/user");
// const GoogleUser = require("../models/googleschema");


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
  // filename: (req, file, cb) => {
  //   const ext = file.mimetype.split("/")[1];
  //   cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
  // },
});

const checkFileType = (file, cb)=>{

  if(file.fieldname === "houseImage"){
    if (file.mimetype.split("/")[1] === "png" ||
    file.mimetype.split("/")[1] === "jpg" ||
    file.mimetype.split("/")[1] === "jpeg"){
      cb(null, true);
    }
    // if(
    //   file.mimetype === "image/png"||
    //   file.mimetype ===  "image/jpg"||
    //   file.mimetype === "image/jpeg"
    // ){
    //   cb(null, true);
    // } 
    else{
      cb(new Error("Not a supported File type!!"), false);
    }
  }
  if(file.fieldname === "proofOfOwnership"){
    if(
      file.mimetype.split("/")[1] ===  "application/pdf" ||
      file.mimetype.split("/")[1] ===  'application/msword'||
      file.mimetype.split("/")[1] ===  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ){
      cb(null, true);
    } else {
      cb(new Error("Not a PDF or other supported File type!!"), false);
    }
  }
} 


const upload = multer({
  storage: multerStorage,
  // fileFilter: checkFileType
})


const cpUpload = upload.fields([{name:"houseImage", maxCount: 1},{name:"proofOfOwnership", maxCount: 1}])
router.post('/api/uploadFile', cpUpload , function(req, res, next){
try{
  const {nameOfOwner,houseNumber,street,LGA,state,} = req.body;
  console.log(req.files);
  console.log(req.files);
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
    })
    newHouseRegistration.save((err)=>{
      if (err){
        console.error(err)
      }else{
       return res.status(200).json("Successfully registerd a house")
      }
    })
  }
  
} catch(error){
  console.log(error)
     return res.json({error})
  }
  // next()
})

module.exports = router;


/*

// Multer Filter from another code
const multerFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[1] === "pdf") {
    cb(null, true);
  } else {
    cb(new Error("Not a PDF File!!"), false);
  }
};

*/