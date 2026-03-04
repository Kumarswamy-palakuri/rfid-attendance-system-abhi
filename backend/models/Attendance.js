const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  rfid_card: String,
  date: Date,
  status: String
});

AttendanceSchema.index({ student: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("Attendance", AttendanceSchema);