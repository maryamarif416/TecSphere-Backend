const mongoose = require("mongoose")
const InternshipSchema = new mongoose.Schema({
    name: { type:String, required:true },
    email: { type:String, required:true },
    mobile: { type:String, required:true },
    course: { type:String, required:true },
    resume: { type:String },
    date: { type:Date, default:Date.now }
})

module.exports = mongoose.model("Internship", InternshipSchema)