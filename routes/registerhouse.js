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
  fileFilter: checkFileType,
})


const cpUpload = upload.fields([{name:"houseImage", maxCount: 1},{name:"proofOfOwnership", maxCount: 1}])
router.post('/api/uploadFile', cpUpload , function(req, res, next){
try{
   // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
  const {nameOfOwner,houseNumber,street,LGA,state,} = req.body;
  console.log(req.files);
  console.log(req.files);
  if (req.files === ""){
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




  const path = require('path');
    const multer = require('multer');
    const storage = multer.diskStorage({
         destination: (req, file, cb) => {
           if (file.fieldname === "profile") {
               cb(null, './uploads/profiles/')
           }
           else if (file.fieldname === "natid") {
               cb(null, './uploads/ids/');
           }
           else if (file.fieldname === "certificate") {
               cb(null, './uploads/certificates/')
           }
        },
        filename:(req,file,cb)=>{
            if (file.fieldname === "profile") {
                cb(null, file.fieldname+Date.now()+path.extname(file.originalname));
            }
          else if (file.fieldname === "natid") {
            cb(null, file.fieldname+Date.now()+path.extname(file.originalname));
          }
          else if (file.fieldname === "certificate") {
            cb(null, file.fieldname+Date.now()+path.extname(file.originalname));
          }
        }
    });
    const upload = multer({
        storage: storage,
        limits: {
            fileSize: 1024 * 1024 * 10
        },
        fileFilter: (req, file, cb) => {
            checkFileType(file, cb);
        }
    }).fields(
        [
            {
                name:'profile',
                maxCount:1
            },
            {
                name: 'natid', maxCount:1
            },
            {
                name: 'certificate', maxCount:1
            }
        ]
    );
    
    function checkFileType(file, cb) {
        if (file.fieldname === "certificate") {
            if (
                file.mimetype === 'application/pdf' ||
                file.mimetype === 'application/msword' ||
                file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
              ) { // check file type to be pdf, doc, or docx
                  cb(null, true);
              } else {
                  cb(null, false); // else fails
              }
        }
        else if (file.fieldname === "natid" || file.fieldname === "profile") {
            if (
                file.mimetype === 'image/png' ||
                file.mimetype === 'image/jpg' ||
                file.mimetype === 'image/jpeg'||
                fiel.mimetype==='image/gif'
              ) { // check file type to be png, jpeg, or jpg
                cb(null, true);
              } else {
                cb(null, false); // else fails
              }
            }
        }
    //at the save function 

 upload(req, res, (err) => {
        if (err) {
            console.log(err);
        } else {
            if (req.file == "undefined") {
                console.log("No image selected!")
            } else {
                let datecreated = new Date();
                let fullnames = req.body.firstname + ' ' + req.body.lastname;
                let formatedphone = '';
                let phone = req.body.personalphone;
                if (phone.charAt(0) == '0') {
                    formatedphone = '+254' + phone.substring(1);
                } else if ((phone.charAt(0) == '+') && (phone.length > 12 || phone.length <= 15)) {
                    formatedphone = phone
                }
                let teachers = {
                    "teacherid": teacherid,
                    "schoolcode": req.body.schoolcode,
                    "fullnames": fullnames,
                    "email": req.body.email,
                    "dateofbirth": req.body.dateofbirth,
                    "nationalid": req.body.nationalid,
                    "personalphone": formatedphone,
                    "profile": req.files.profile[0].path,
                    "natid": req.files.natid[0].path,
                    "certificate":req.files.certificate[0].path
                }
                connection.query('INSERT INTO teachers SET ?', teachers, (error, results, fields) => {`enter code here`
                    if (error) {
                        res.json({
                            status: false,
                            message: 'there are some error with query'
                        })
                        console.log(error);
                    } else {console.log("Saved successfully");
}
*/
