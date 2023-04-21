const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { RegisterHouse } = require("../models/registerhouseschema");
// const multer = require("multer");


const router = express.Router();

router.use(bodyParser.urlencoded({extended:false}))
router.use(bodyParser.json());

router.get("/api/verifyHouse", (req, res)=>{
    try{
        const {houseNumber, street, LGA, state } = req.body;
        console.log(street, 1)
        console.log(state, 2)
        console.log(LGA, 3)
        console.log(houseNumber, 4)
         RegisterHouse.find({
            $and:[
                {houseNumber: houseNumber},
                {street:street},
                {LGA:LGA},
                {state:state}
            ]
            //"enter the filter field here"
           },(err, found)=>{
                if(err){
                    console.log(err)
                }
                if(!found){
                    return res.status(400).json("Sorry we've got no record of such!")
                }if(found){
                    return res.status(200).json({
                       owner: found.nameOfOwner,
                       houseImg:found.houseImg,
                       dateregisterd:found.createdAt
                    })
                }
            })
    }catch(err){
        console.log(err)
    }
  
})


module.exports = router;



// 3. Verify a house
// Input values: (House number, house address (name of street), LGA, state, country (for now, Nigeria)  
// Output: name of house owner, image of house.