const express = require("express");
let router = express.Router();
const streaksController = require("../controllers/streaks.controller");
const authController = require("../controllers/auth.controller");

router.route("/:idU")
  .get(authController.verifyToken, streaksController.getStreaksByUserId)

  router.route("/")
  .patch(authController.verifyToken, streaksController.updateStreak)

router.all("*", function (req, res) {
  res.status(404).json({ message: "No route found" });
});

module.exports = router;
