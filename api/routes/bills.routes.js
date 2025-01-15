const express = require("express");
let router = express.Router();
const billsController = require("../controllers/bills.controller");
const authController = require("../controllers/auth.controller");

router
  .route("/")
  .get(authController.verifyToken, (req, res) => {
    if (req.query.month && req.query.year) {
      billsController.findBillsForMonth(req, res);
    } else {
      billsController.findBills(req, res);
    }
  })
  .post(authController.verifyToken, billsController.create);
router.route('/currencies').get(billsController.findCurrencies);
router
  .route("/:idB")
  .get(billsController.findBill)
  .patch(authController.verifyToken, billsController.edit)
  .delete(authController.verifyToken, billsController.delete);

router.all("*", function (req, res) {
  res.status(404).json({ message: "users: what???" });
});

module.exports = router;
