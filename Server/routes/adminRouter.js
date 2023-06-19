const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authController = require("../controllers/authController");


router.get("/admin", adminController.allAdmins);
router.post("/admin", adminController.newAdmin, authController.createToken);
router.get("/admin/:id", adminController.oneAdmin);
router.put("/admin/:id", adminController.updateAdmin);
router.delete("/admin/:id", adminController.deleteAdmin);

module.exports = router;