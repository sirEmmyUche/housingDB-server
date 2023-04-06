require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const { RegisterHouse, Img} = require("../models/registerhouseschema");
const multer  = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
const upload = multer({ dest: "public/files" });

const router = express.Router();

router.use(bodyParser.urlencoded({extended:false}))
router.use(bodyParser.json());


// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public");
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split("/")[1];
//     cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
//   },
// });


// const upload = multer({
//   storage: multerStorage,
//   fileFilter: multerFilter,
// });


router.post('/api/uploadFile', upload.single("myFile"), function (req, res, next) {
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
  // const {nameOfOwner,houseNumber,street,LGA,state, houseImg } = req.body;
  console.log(req.file)

  // const newHouseRegistration = new HouseRegistration({
  //   nameOfOwner: nameOfOwner,
  //   houseNumber: houseNumber,
  //   street: street,
  //   LGA: LGA,
  //   state: state,
  //   houseImg : houseImg
  // })
  // newHouseRegistration.save((err)=>{
  //   if (err){
  //     console.error(err)
  //   }else{
  //     res.status(200).json("Successfully registerd a house")
  //   }
  // })
  // next()
})

module.exports = router;


