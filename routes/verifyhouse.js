const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { RegisterHouse } = require("../models/registerhouseschema");
const multer = require("multer");


const router = express.Router();

router.use(bodyParser.urlencoded({extended:false}))
router.use(bodyParser.json());

router.get("/api/verifyHouse", async (req, res)=>{
    const {houseNumber, street, LGA, state} = req.body;
       RegisterHouse.find({
        $and:[{houseNumber:houseNumber}, 
        {street:street}, 
        {LGA:LGA}, 
        {state:state}]},(err, found)=>{
            if(err){
                console.log(err)
            }if(!found){
                return res.status(400).json("Sorry we've got no record of such!")
            }if(found){
                if(LGA === found.LGA && 
                    street === found.street &&
                    houseNumber === found.houseNumber &&
                    state === found.state){
                        console.log(found.nameOfOwner)
                    }
                // return res.status(200).json({
                //    owner:found.nameOfOwner,
                //    houseImg:found.houseImg,
                //    dateregisterd:found.createdAt
                // })
            }
        })
})


module.exports = router;



// 3. Verify a house
// Input values: (House number, house address (name of street), LGA, state, country (for now, Nigeria)  
// Output: name of house owner, image of house.