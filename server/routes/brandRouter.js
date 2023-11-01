const Router = require("express");
const router = new Router();
const BrandController = require("../controllers/brandController");
const checkRole = require("../middleware/checkRole");
router.post("/createBrand", checkRole("ADMIN"), BrandController.createBrand);
router.post("/deleteBrand", checkRole("ADMIN"), BrandController.deleteBrand);
router.put("/updateBrand", checkRole("ADMIN"), BrandController.updateBrand);

router.get("/", BrandController.getAllBrand);

module.exports = router;
