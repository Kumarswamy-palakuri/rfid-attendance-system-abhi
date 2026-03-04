const router = require("express").Router();
const ctrl = require("../controllers/studentController");
const auth = require("../middleware/authMiddleware");

router.get("/",auth,ctrl.getStudents);
router.post("/",auth,ctrl.createStudent);
router.put("/:id",auth,ctrl.updateStudent);
router.delete("/:id",auth,ctrl.deleteStudent);

module.exports = router;