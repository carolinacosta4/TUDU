const express = require("express");
let router = express.Router();
const tipsController = require("../controllers/tipCategories.controller");

router.route("/").post(tipsController.addNewTipCategory);
router.route("/").get(tipsController.findAll);
router.route("/:nameTC").delete(tipsController.deleteTipCategory);
router.route("/:_id").get(tipsController.findById);

router.all("*", function (req, res) {
  res.status(404).json({ message: "No route found" });
});

module.exports = router;