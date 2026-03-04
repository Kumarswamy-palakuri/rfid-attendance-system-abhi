const Student = require("../models/Student")
const Attendance = require("../models/Attendance")

exports.teacherDashboard = async(req,res)=>{

 const totalStudents = await Student.countDocuments()

 const today = new Date().setHours(0,0,0,0)

 const todayAttendance = await Attendance.countDocuments({date:today})

 const absent = totalStudents - todayAttendance

 res.json({
   totalStudents,
   todayAttendance,
   absent
 })

}