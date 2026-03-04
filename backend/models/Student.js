const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  name: String,
  roll_number: String,
  department: String,
  rfid_card: { type: String, unique: true },
  email: String,
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Student", StudentSchema);