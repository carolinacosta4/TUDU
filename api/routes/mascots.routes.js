const express = require("express");
let router = express.Router();
const mascotsController = require("../controllers/mascots.controller");

router
    .route("/")
    .get(mascotsController.findAll)


// router.route("/:idM")
//   .get(tipsController.findOne)


router.all("*", function (req, res) {
    res.status(404).json({ message: "No route found" });
});

module.exports = router;