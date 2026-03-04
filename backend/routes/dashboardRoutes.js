const router = require("express").Router();
const ctrl = require("../controllers/dashboardController");
const auth = require("../middleware/authMiddleware");

router.get("/teacher",auth,ctrl.teacherDashboard);

module.exports = router;