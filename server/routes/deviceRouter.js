const Router = require("express");
const router = new Router();

const DeviceController = require("../controllers/deviceController");
const checkRole = require("../middleware/checkRole");

router.post("/createDevice", checkRole("ADMIN"), DeviceController.createDevice);
router.post("/deleteDevice", checkRole("ADMIN"), DeviceController.deleteDevice);
router.put("/updateDevice", checkRole("ADMIN"), DeviceController.updateDevice);
router.put(
  "/updateDeviceInfo",
  checkRole("ADMIN"),
  DeviceController.updateDeviceInfo
);

router.post(
  "/deleteDeviceInfo",
  checkRole("ADMIN"),
  DeviceController.deleteDeviceInfo
);

router.get("/", DeviceController.getAllDevice);
router.get("/:id", DeviceController.getOne);

module.exports = router;
