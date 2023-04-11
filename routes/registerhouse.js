require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const { RegisterHouse } = require("../models/registerhouseschema");
// const User = require("./models/user");
// const GoogleUser = require("../models/googleschema");
const multer  = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
// const upload = multer({ dest: "public/files" });

const router = express.Router();

router.use(bodyParser.urlencoded({extended:false}))
router.use(bodyParser.json());


const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
  },
});


const upload = multer({
  storage: multerStorage,
  // fileFilter: multerFilter,
});

const cpUpload = upload.fields([{name:"houseImage", maxCount: 3},{name:"proofOfOwnership", maxCount: 1}])
router.post('/api/uploadFile', cpUpload , function(req, res, next){
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
  const houseImg = req.files["houseImage"][0];
  const proofOfOwnership = req.files["proofOfOwnership"][0];
  const {nameOfOwner,houseNumber,street,LGA,state,} = req.body;
  console.log(houseImg),
  console.log(proofOfOwnership)
  
  const newHouseRegistration = new RegisterHouse({
    nameOfOwner: nameOfOwner,
    houseNumber: houseNumber,
    street: street,
    LGA: LGA,
    state: state,
    houseImg : houseImg,
    proofOfOwnership: proofOfOwnership
  })
  newHouseRegistration.save((err)=>{
    if (err){
      console.error(err)
    }else{
      res.status(200).json("Successfully registerd a house")
    }
  })
  next()
})

module.exports = router;
