require("dotenv").config()

const express = require("express")
const cors = require("cors")

const connectDB = require("./config/db")

connectDB()

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api",require("./routes/authRoutes"))
app.use("/api/students",require("./routes/studentRoutes"))
app.use("/api",require("./routes/attendanceRoutes"))
app.use("/api/dashboard",require("./routes/dashboardRoutes"))

app.listen(process.env.PORT,()=>{
 console.log("Server running")
})