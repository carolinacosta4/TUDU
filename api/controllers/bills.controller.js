const db = require("../models/index.js");
const mongoose = require("mongoose");
const Bill = db.Bill;
const Currency = db.Currency;

const handleErrorResponse = (res, error) => {
  return res
    .status(500)
    .json({ success: false, msg: error.message || "Some error occurred." });
};

exports.findBillsForMonth = async (req, res) => {
  try {
    if (!req.query.month || !req.query.year) {
      return res.status(400).json({
        success: false,
        error: "Query parameters missing",
        msg: "You need to provide query parameters for month and year.",
      });
    }

    const month = parseInt(req.query.month);
    const year = parseInt(req.query.year);

    if (isNaN(month) || isNaN(year)) {
      return res.status(400).json({
        success: false,
        error: "Invalid month or year format",
        msg: "The provided month or year is not valid. Use valid month (1-12) and year.",
      });
    }

    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const bills = await Bill.find({
      IDuser: req.loggedUserId,
      dueDate: { $gte: startDate, $lte: endDate },
    })
      .populate(
        "IDuser",
        "-password -__v -profilePicture -cloudinary_id -notifications -sound -vibration -darkMode -isDeactivated -onboardingSeen -IDmascot"
      )
      .populate("IDcurrency", "-__v")
      .select("-__v")
      .sort({ dueDate: 1 })
      .exec();

    if (!bills || bills.length === 0) {
      return res.status(200).json({
        success: false,
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      data: bills,
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

exports.findBills = async (req, res) => {
  try {
    if (!req.query.date) {
      return res.status(400).json({
        success: false,
        error: "Query parameter missing",
        msg: "You need to provide a query parameter for the date.",
      });
    }

    const dateQuery = new Date(req.query.date);
    if (isNaN(dateQuery)) {
      return res.status(400).json({
        success: false,
        error: "Invalid date format",
        msg: "The provided date is not valid. Use a valid date format.",
      });
    }

    const startOfDay = new Date(dateQuery.setHours(0, 0, 0, 0));
    const endOfDay = new Date(dateQuery.setHours(23, 59, 59, 999));

    const bills = await Bill.find({
      IDuser: req.loggedUserId,
      dueDate: { $gte: startOfDay, $lte: endOfDay },
    })
      .populate(
        "IDuser",
        "-password -__v -profilePicture -cloudinary_id -notifications -sound -vibration -darkMode -isDeactivated -onboardingSeen -IDmascot"
      )
      .populate("IDcurrency", "-__v")
      .select("-__v")
      .exec();

    if (!bills || bills.length === 0) {
      return res.status(200).json({
        success: false,
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      data: bills,
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

exports.create = async (req, res) => {
  try {
    if (Object.values(req.body).length == 0)
      return res.status(400).json({
        success: false,
        msg: "You need to provide the body with the request.",
      });

    if (
      !req.body.name ||
      !req.body.priority ||
      !req.body.amount ||
      !req.body.dueDate ||
      !req.body.IDcurrency ||
      !req.body.periodicity ||
      req.body.notification == null
    ) {
      return res.status(400).json({
        success: false,
        error: "Fields missing",
        msg: "You need to provide the name, priority, amount, dueDate, IDcurrency, periodicity and notification.",
      });
    }

    const billInstances = [];
    const numberOfRepetitions = 5;
    let currentDueDate = new Date(req.body.dueDate);

    for (let i = 0; i < numberOfRepetitions; i++) {
      billInstances.push({
        name: req.body.name,
        priority: req.body.priority,
        amount: req.body.amount,
        dueDate: new Date(currentDueDate),
        periodicity: req.body.periodicity,
        notification: req.body.notification,
        IDcurrency: req.body.IDcurrency,
        notes: req.body.notes || "",
        status: false,
        IDuser: req.loggedUserId,
      });

      switch (req.body.periodicity) {
        case "daily":
          currentDueDate.setDate(currentDueDate.getDate() + 1);
          break;
        case "weekly":
          currentDueDate.setDate(currentDueDate.getDate() + 7);
          break;
        case "monthly":
          currentDueDate.setMonth(currentDueDate.getMonth() + 1);
          break;
        case "never":
          i = numberOfRepetitions;
          break;
        default:
          return res.status(400).json({
            success: false,
            msg: "Invalid periodicity value.",
          });
      }
    }

    const newBills = await Bill.insertMany(billInstances);
    const bills = await Bill.populate(newBills, [
      { path: "IDcurrency", select: "-__v" }
    ]);

    return res.status(201).json({
      success: true,
      msg: "Bill created successfully.",
      data: bills,
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

exports.findBill = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.idB))
      return res.status(400).json({
        success: false,
        msg: "Invalid ID.",
      });

    const bill = await Bill.findById(req.params.idB)
      .populate(
        "IDuser",
        "-password -__v -profilePicture -cloudinary_id -notifications -sound -vibration -darkMode -isDeactivated"
      )
      .populate("IDcurrency", "-__v")
      .select("-__v")
      .exec();

    return res.status(200).json({
      success: true,
      data: bill,
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

exports.edit = async (req, res) => {
    
  try {
    if (!mongoose.isValidObjectId(req.params.idB))
      return res.status(400).json({
        success: false,
        msg: "Invalid ID.",
      });

    const bill = await Bill.findById(req.params.idB);
    if (!bill)
      return res.status(404).json({
        success: false,
        msg: "Bill not found.",
      });

    if (bill.IDuser != req.loggedUserId) {
      return res.status(401).json({
        success: false,
        error: "Forbidden",
        msg: "You don't have permission to edit this bill.",
      });
    }

    if (Object.values(req.body).length == 0)
      return res.status(400).json({
        success: false,
        msg: "You need to provide the body with the request.",
      });

    if (!req.body.periodicity && !req.body.dueDate && req.body.status == null)
      return res.status(400).json({
        success: false,
        error: "Fields missing",
        msg: "You need to provide the periodicity or due date.",
      });

    await Bill.findByIdAndUpdate(req.params.idB, {
      periodicity: req.body.periodicity
        ? req.body.periodicity
        : bill.periodicity,
      name: req.body.name ? req.body.name : bill.name,
      IDcurrency: req.body.IDcurrency ? req.body.IDcurrency : bill.IDcurrency,
      amount: req.body.amount ? Number(req.body.amount) : bill.amount,
      priority: req.body.priority ? req.body.priority : bill.priority,
      dueDate: req.body.dueDate ? req.body.dueDate : bill.dueDate,
      status: req.body.status != null ? req.body.status : bill.status,
      notification: req.body.notification
        ? req.body.notification
        : bill.notification,
      notes: req.body.notes ? req.body.notes : bill.notes,
    });

    const updatedBill = await Bill.findById(req.params.idB);
    return res.status(200).json({
      success: true,
      data: updatedBill,
    });
  } catch (error) {    
    handleErrorResponse(res, error);
  }
};

exports.delete = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.idB))
      return res.status(400).json({
        success: false,
        msg: "Invalid bill ID.",
      });

    const bill = await Bill.findById(req.params.idB);
    if (!bill)
      return res.status(404).json({
        success: false,
        msg: "Bill not found.",
      });

    if (bill.IDuser != req.loggedUserId)
      return res.status(401).json({
        success: false,
        error: "Forbidden",
        msg: "You don't have permission to delete this bill.",
      });

    await Bill.findByIdAndDelete(bill._id);

    return res.status(200).json({
      success: true,
      msg: "Bill deleted successfully.",
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

exports.findCurrencies = async (req, res) => {
  try {
    const currencies = await Currency.find().exec();

    if (!currencies || currencies.length === 0) {
      return res.status(404).json({
        success: false,
        error: "No currencies found",
      });
    }

    return res.status(200).json({
      success: true,
      data: currencies,
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};
