const express = require("express");
const { registerUser, loginUser, logout, getAdminUsers, getAdminStats, myProfile } = require("../controller/user.js");
const { isAuthenticated, isAdmin } = require("../middlewares/Auth.js");


const router = express.Router();


router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/me").get(isAuthenticated, myProfile);

router.route("/logout").get(logout);

// Admin Routes

router.route("/admin/users").get(isAuthenticated, isAdmin, getAdminUsers);

router.route("/admin/stats").get(isAuthenticated, isAdmin, getAdminStats);





module.exports = router;