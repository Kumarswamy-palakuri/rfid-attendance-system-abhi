const Student = require("../models/Student");
const Attendance = require("../models/Attendance");

exports.scanRFID = async(req,res)=>{

 const {rfid_card} = req.body;

 const student = await Student.findOne({rfid_card});

 if(!student)
  return res.status(404).json({message:"Invalid card"})

 const today = new Date().setHours(0,0,0,0)

 const exists = await Attendance.findOne({
   student:student._id,
   date:today
 })

 if(exists)
   return res.json({message:"Already marked today"})

 const attendance = await Attendance.create({
  student:student._id,
  rfid_card,
  date:today,
  status:"present"
 })

 res.json({message:"Attendance Marked",attendance})

}