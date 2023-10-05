const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { RegisterHouse } = require("../models/registerhouseschema");


const router = express.Router();

router.use(bodyParser.urlencoded({extended:false}))
router.use(bodyParser.json());

router.post("/verifyHouse", async (req, res)=>{
    try{
        const {houseNumber, street, LGA, state } = req.body;
        const findHouse = await RegisterHouse.find({
            $and:[
                {houseNumber: houseNumber},
                {street:street},
                {LGA:LGA},
                {state:state}
            ] });

            if(findHouse.length === 0 || findHouse === undefined){
                return res.status(404).json({
                    message:"Sorry we've got no record of such!",
                }) 
            };

            if(findHouse){
                const result = findHouse.map((item)=>{
                    return ({
                        id:item.id,
                        owner: item.nameOfOwner,
                        houseImg: item.houseImg,
                        dateRegisterd:item.createdAt})
                })
                return res.status(200).json(...result)
            };
    }catch(err){
         console.log(err)
        return res.status(500).json({error:"An error occured"})
    }
  
})


module.exports = router;
 