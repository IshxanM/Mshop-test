const Router = require("express");
const router = new Router();
const TypeController = require("../controllers/typeController");
const checkRole = require("../middleware/checkRole");
router.post("/createType", checkRole("ADMIN"), TypeController.createType);
router.get("/", TypeController.getAllType);
router.post("/deleteType", checkRole("ADMIN"), TypeController.deleteType);
router.put("/updateType", checkRole("ADMIN"), TypeController.updateType);

module.exports = router;
