const express = require("express");
let router = express.Router();
const tasksController = require("../controllers/tasks.controller");
const authController = require("../controllers/auth.controller");

router
  .route("/")
  .post(authController.verifyToken, tasksController.create)
  .get(authController.verifyToken, tasksController.findTasks);
router.route("/categories").get(tasksController.findCategories);
router
  .route("/:idT")
  .get(tasksController.findTask)
  .patch(authController.verifyToken, tasksController.edit)
  .delete(authController.verifyToken, tasksController.delete);

router.all("*", function (req, res) {
  res.status(404).json({ message: "users: what???" });
});

module.exports = router;
