const express = require("express");
const bodyParser = require("body-parser");
const {Service} = require("../models/serviceSchema");

const router = express.Router();
router.use(bodyParser.urlencoded({extended:false}))
router.use(bodyParser.json());

router.get("/api/service", async(req, res)=>{
    try{
        const services = await Service.find()
        return res.status(200).json({services})
    }catch(err){
        // console.log(err)
        return res.status(500).json({message:"An error occured"})
    }
})

router.get("/api/service/:id", async(req, res)=>{
    try{
        const id = req.params.id 
        Service.findOne({_id:id},(err,result)=>{
        if(err){
            // console.log(err)
            return res.status(404).json({message:"Cannot find product"})
        }else{
            return res.status(200).json(result)
        }
    })
    }catch(err){
        // console.log(err)
        return res.status(500).json({message:"Unable to fetch products"})
    }
})

module.exports = router;

