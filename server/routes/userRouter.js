const Router = require("express");
const userController = require("../controllers/userController");
const router = new Router();
const AuthMiddleware = require("../middleware/AuthMiddleware");

router.post("/registration", userController.registration);

router.post("/login", userController.login);
// router.get("/active/:link", userController.activate);
router.post("/reset-password", userController.resetPassword);
router.patch(
  "/set-new-reset-password/:link",
  userController.setNewResetPassword
);

router.get("/auth", AuthMiddleware, userController.check);
router.get("/auth/get", AuthMiddleware, userController.getUser);
router.put("/updateMyInfo", AuthMiddleware, userController.updateMyinfo);

module.exports = router;
