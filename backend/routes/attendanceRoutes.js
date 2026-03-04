const router = require("express").Router();
const ctrl = require("../controllers/attendanceController");

router.post("/scan-rfid",ctrl.scanRFID);

module.exports = router;