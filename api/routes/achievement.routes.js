const express = require("express");
let router = express.Router();
const achievementController = require("../controllers/achievements.controller");

router.route("/")
  .get(achievementController.findAll)
  .post(achievementController.create)

router.route("/:idA")
    .delete(achievementController.deleteAchievement)

router.all("*", function (req, res) {
  res.status(404).json({ message: "No route found" });
});

module.exports = router;