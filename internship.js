const express = require("express")
const router = express.Router()
const multer = require("multer")
const path = require("path")
const Internship = require("../models/Internship")

// Multer setup
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,"uploads/")
    },
    filename: function(req,file,cb){
        const ext = path.extname(file.originalname)
        cb(null, Date.now() + ext)
    }
})

const upload = multer({ storage })

// Submit Internship Form
router.post("/apply", upload.single("resume"), async (req,res)=>{
    try{
        const {name,email,mobile,course} = req.body
        const resume = req.file ? req.file.filename : null

        const application = new Internship({name,email,mobile,course,resume})
        await application.save()

        res.json({message:"Application Submitted"})
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
})

// Get all applications (for Admin)
router.get("/all", async (req,res)=>{
    try{
        const applications = await Internship.find().sort({date:-1})
        res.json(applications)
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
})
// DELETE application
router.delete("/:id", async (req,res)=>{
    try{
        await Internship.findByIdAndDelete(req.params.id)
        res.json({message:"Application Deleted"})
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
})
module.exports = router

