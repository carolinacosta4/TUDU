const db = require("../models/index.js");
const mongoose = require("mongoose");
const Task = db.Task;
const Category = db.CategoryTask;

const handleErrorResponse = (res, error) => {
  return res
    .status(500)
    .json({ success: false, msg: error.message || "Some error occurred." });
};

exports.findTasks = async (req, res) => {
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

    const tasks = await Task.find({
      IDuser: req.loggedUserId,
      $or: [{ startDate: { $lte: endOfDay }, endDate: { $gte: startOfDay } }],
    })
      .populate(
        "IDuser",
        "-password -__v -profilePicture -cloudinary_id -notifications -sound -vibration -darkMode -isDeactivated -onboardingSeen -IDmascot"
      )
      .select("-__v")
      .exec();

    if (!tasks || tasks.length === 0) {
      return res.status(200).json({
        success: false,
        data: [],
      });
    }

    return res.status(200).json({
      success: true,
      data: tasks,
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
      !req.body.IDcategory ||
      !req.body.startDate ||
      !req.body.endDate ||
      !req.body.periodicity ||
      req.body.notification == null
    ) {
      return res.status(400).json({
        success: false,
        error: "Fields missing",
        msg: "You need to provide the name, priority, category, startDate, endDate, periodicity and notification.",
      });
    }

    if (new Date(req.body.endDate) <= new Date(req.body.startDate)) {
      return res.status(400).json({
        success: false,
        msg: "The end date must be later than the start date.",
      });
    }

    let task = new Task({
      name: req.body.name,
      priority: req.body.priority,
      IDcategory: req.body.IDcategory,
      startDate: new Date(req.body.startDate),
      endDate: new Date(req.body.endDate),
      periodicity: req.body.periodicity,
      notification: req.body.notification,
      notes: req.body.notes || "",
      status: false,
      IDuser: req.loggedUserId,
    });

    const newTask = await task.save();

    return res.status(201).json({
      success: true,
      msg: "Task created successfully.",
      data: newTask,
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

exports.findTask = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.idT))
      return res.status(400).json({
        success: false,
        msg: "Invalid ID.",
      });

    const task = await Task.findById(req.params.idT)
      .populate(
        "IDuser",
        "-password -__v -profilePicture -cloudinary_id -notifications -sound -vibration -darkMode -isDeactivated -onboardingSeen -IDmascot"
      )
      .populate("IDcategory", "-_id -__v")
      .select("-_id -__v")
      .exec();

    if (!task) {
      return res.status(404).json({
        success: false,
        error: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

exports.edit = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.idT))
      return res.status(400).json({
        success: false,
        msg: "Invalid ID.",
      });

    const task = await Task.findById(req.params.idT);
    if (!task)
      return res.status(404).json({
        success: false,
        msg: "Task not found.",
      });

    if (task.IDuser != req.loggedUserId) {
      return res.status(401).json({
        success: false,
        error: "Forbidden",
        msg: "You don't have permission to edit this task.",
      });
    }

    if (Object.values(req.body).length == 0)
      return res.status(400).json({
        success: false,
        msg: "You need to provide the body with the request.",
      });

    if (
      !req.body.periodicity &&
      !req.body.startDate &&
      !req.body.endDate &&
      req.body.status == null
    )
      return res.status(400).json({
        success: false,
        error: "Fields missing",
        msg: "You need to provide the periodicity, start date or end date.",
      });

    await Task.findByIdAndUpdate(req.params.idT, {
      periodicity: req.body.periodicity
        ? req.body.periodicity
        : task.periodicity,
      startDate: req.body.startDate ? req.body.startDate : task.startDate,
      endDate: !req.body.endDate ? req.body.endDate : task.endDate,
      status: req.body.status != null ? req.body.status : task.status,
    });

    const updatedTask = await Task.findById(req.params.idT);
    return res.status(200).json({
      success: true,
      data: updatedTask,
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

exports.delete = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.idT))
      return res.status(400).json({
        success: false,
        msg: "Invalid task ID.",
      });

    const task = await Task.findById(req.params.idT);
    if (!task)
      return res.status(404).json({
        success: false,
        msg: "Task not found.",
      });

    if (task.IDuser != req.loggedUserId)
      return res.status(401).json({
        success: false,
        error: "Forbidden",
        msg: "You don't have permission to delete this task.",
      });

    await Task.findByIdAndDelete(task._id);

    return res.status(200).json({
      success: true,
      msg: "Task deleted successfully.",
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

exports.findCategories = async (req, res) => {
  try {
    const categories = await Category.find().exec();

    if (!categories || categories.length === 0) {
      return res.status(404).json({
        success: false,
        error: "No categories found",
      });
    }

    return res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};
