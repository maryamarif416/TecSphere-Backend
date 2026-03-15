const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const path = require("path")

const app = express()

app.use(cors())
app.use(express.json())
app.use("/uploads", express.static(path.join(__dirname,"uploads")))

// MongoDB Atlas connection
mongoose.connect("mongodb+srv://maryam2004arif_db_user:0GEKTzOvTp5iUtMJ@tecsphere.tpp8tix.mongodb.net/tecsphere")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err))

// Routes
const authRoutes = require("./routes/auth")
const internshipRoutes = require("./routes/internship")

app.use("/api/auth", authRoutes)
app.use("/api/internship", internshipRoutes)

app.listen(5000, ()=>console.log("Server running on port 5000"))