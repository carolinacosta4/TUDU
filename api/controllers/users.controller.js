const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../models/index.js");
const config = require("../config/db.config.js");
const mongoose = require("mongoose");
const User = db.User;
const FavoriteTip = db.FavoriteTip;
const Task = db.Task;
const Bill = db.Bill;
const UserAchievements = db.UserAchievements;
const Streaks = db.Streaks;
const nodemailer = require("nodemailer");

const handleErrorResponse = (res, error) => {
  return res
    .status(500)
    .json({ success: false, msg: error.message || "Some error occurred." });
};

exports.findAll = async (req, res) => {
  try {
    const users = await User.find().select("-password").exec();

    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

exports.findUser = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.idU))
      return res.status(400).json({
        success: false,
        msg: "Invalid ID.",
      });

    const user = await User.findById(req.params.idU)
      .populate("IDmascot", "-_id -cloudinary_id")
      .select("-_id -__v")
      .exec();

    const userFavoriteTips = await FavoriteTip.find({ IDuser: req.params.idU })
      .select("-_id -__v")
      .exec();

    const userTasks = await Task.find({ IDuser: req.params.idU })
      .select("-_id -__v")
      .exec();

    const userBills = await Bill.find({ IDuser: req.params.idU })
      .select("-_id -__v")
      .exec();

    const userAchievements = await UserAchievements.find({
      IDuser: req.params.idU,
    })
      .select("-_id -__v")
      .exec();

    return res.status(200).json({
      success: true,
      data: user,
      FavoriteTip: userFavoriteTips,
      userTasks: userTasks,
      userBills: userBills,
      userAchievements: userAchievements,
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

exports.register = async (req, res) => {
  try {
    if (Object.values(req.body).length == 0)
      return res.status(400).json({
        success: false,
        msg: "You need to provide the body with the request.",
      });

    if (
      !req.body.name ||
      !req.body.email ||
      !req.body.password ||
      !req.body.confirmPassword
    )
      return res.status(400).json({
        success: false,
        error: "Fields missing",
        msg: "You need to provide the name, email, password and confirm password.",
      });

    if (req.body.password != req.body.confirmPassword)
      return res.status(400).json({
        success: false,
        msg: "Passwords not matching.",
      });

    let user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      profilePicture: "https://example.com/profile.jpg",
      cloudinary_id: 0,
      IDmascot: "6763080a51fd2aabdb86aab3",
    });

    const newUser = await user.save();

    return res.status(201).json({
      success: true,
      msg: "Account created successfully.",
      data: newUser,
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

exports.login = async (req, res) => {
  try {
    if (Object.values(req.body).length == 0)
      return res.status(400).json({
        success: false,
        msg: "You need to provide the body with the request.",
      });

    if (!req.body.email || !req.body.password)
      return res.status(400).json({
        success: false,
        error: "Fields missing",
        msg: "You need to provide the email and password.",
      });

    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(404).json({
        success: false,
        error: "User not found",
        msg: "The user you tried loggin in doesn't exist.",
      });

    const check = bcrypt.compareSync(req.body.password, user.password);
    if (!check)
      return res.status(400).json({
        success: false,
        msg: "Wrong password.",
      });

    const token = jwt.sign({ id: user._id }, config.SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      success: true,
      msg: "User logged in successfully.",
      accessToken: token,
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

const transporter = nodemailer.createTransport({
  secure: true,
  host: "smtp.gmail.com",
  port: 465,
  auth: {
    user: config.MAIL_USER,
    pass: config.MAIL_PASSWORD,
  },
});

exports.recoverEmail = async (req, res) => {
  try {
    if (!req.body.email)
      return res.status(400).json({
        success: false,
        msg: "Email is mandatory.",
      });

    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(400).json({
        success: false,
        msg: "User not found.",
      });

    const mailOptions = {
      from: config.MAIL_USER,
      to: user.email,
      subject: "Password Reset",
      html: `
      <div style="font-family: 'Arial', sans-serif; text-align: center; background-color: #F2E8F8; padding: 20px; font-size: 14px; color: #4A4A4A;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; padding: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="font-family: 'Arial', sans-serif; font-weight: 600; font-size: 24px; color: #6F36C9; margin-bottom: 20px;">
              🔒 Reset Your Password
            </h1>
          </div>
          <p style="margin: 10px 0; font-size: 16px;">Hi ${user.name},</p>
          <p style="margin: 10px 0; font-size: 16px;">We noticed you've requested to reset your password. No worries! For your security and convenience, click the button below to create a new password:</p>       
          <p style="margin: 30px 0;">
            <a href="http://localhost:4000/reset-password/${user.id}" 
              style="color: #ffffff; background-color: #6F36C9; padding: 15px 25px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
              Reset Password
            </a>
          </p>
          <p style="margin: 10px 0; font-size: 14px; color: #4A4A4A;">If you didn't make this request, simply ignore this email. Your account will remain secure.</p>
          <p style="margin: 20px 0; font-size: 14px; color: #4A4A4A;">For any further assistance, feel free to reach out to us. We're here to help!</p>
          <p style="margin-top: 20px; margin-bottom: 10px; font-size: 16px; font-family: 'Arial', sans-serif; font-weight: 500;">Cheers,<br>The TUDU Support Team</p>
          <div style="margin-top: 20px;">
            <img src="https://res.cloudinary.com/ditdnslga/image/upload/v1734716115/ydhoz2f5k5umd0xsynm0.png" alt="TUDU Mascot" style="width: 50px; height: auto; margin-bottom: 5px;" />
            <p style="font-size: 12px; color: #9C9C9C;">✨ Building trust, one click at a time. ✨</p>
          </div>
        </div>
      </div>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({
          success: true,
          msg: "Failed to send recovery email.",
        });
      }
      return res.json({
        success: true,
        msg: "Recovery Password email sent.",
      });
    });
  } catch (error) {
    handleErrorResponse();
  }
};

exports.resetPassword = async (req, res) => {
  try {
    if (!req.body.password || !req.body.confirmPassword)
      return res.status(400).json({
        success: false,
        msg: "Password and confirm password are mandatory.",
      });

    const user = await User.findById(req.params.idU);
    if (!user)
      return res.status(400).json({
        success: false,
        msg: "User not found.",
      });

    if (req.body.password != req.body.confirmPassword)
      return res.status(400).json({
        success: false,
        msg: "Passwords not matching.",
      });

    await User.findByIdAndUpdate(req.params.idU, {
      password: bcrypt.hashSync(req.body.password, 10),
    });

    return res.json({
      success: true,
      msg: `User ${req.params.idU} was updated successfully.`,
    });
  } catch (error) {
    if (error instanceof Sequelize.ConnectionError) {
      return res.status(503).json({
        error: "Database Error",
        msg: "There was an issue connecting to the database. Please try again later",
      });
    } else {
      return res.status(500).json({
        error: "Server Error",
        msg: "An unexpected error occurred. Please try again later.",
      });
    }
  }
};

exports.edit = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.idU))
      return res.status(400).json({
        success: false,
        msg: "Invalid ID.",
      });

    const user = await User.findById(req.params.idU);
    if (!user)
      return res.status(404).json({
        success: false,
        msg: "User not found.",
      });

    if (req.params.idU != req.loggedUserId) {
      return res.status(401).json({
        success: false,
        error: "Forbidden",
        msg: "You don't have permission to edit this user.",
      });
    }

    if (Object.values(req.body).length == 0)
      return res.status(400).json({
        success: false,
        msg: "You need to provide the body with the request.",
      });

    if (!req.body.name && !req.body.email && !req.body.password)
      return res.status(400).json({
        success: false,
        error: "Fields missing",
        msg: "You need to provide the name, email or password.",
      });

    await User.findByIdAndUpdate(req.params.idU, {
      name: req.body.name || user.name,
      email: req.body.email || user.name,
      password: req.body.password || user.name,
    });

    const updatedUser = await User.findById(req.params.idU);
    return res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

exports.editOnboarding = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.idU))
      return res.status(400).json({
        success: false,
        msg: "Invalid ID.",
      });

    const user = await User.findById(req.params.idU);
    if (!user)
      return res.status(404).json({
        success: false,
        msg: "User not found.",
      });

    if (req.params.idU != req.loggedUserId) {
      return res.status(401).json({
        success: false,
        error: "Forbidden",
        msg: "You don't have permission to edit this user.",
      });
    }

    await User.findByIdAndUpdate(req.params.idU, {
      onboardingSeen: true,
    });

    const updatedUser = await User.findById(req.params.idU);
    return res.status(200).json({
      success: true,
      data: updatedUser,
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

exports.delete = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.idU))
      return res.status(400).json({
        success: false,
        msg: "Invalid user ID.",
      });

    const user = await User.findById(req.params.idU);
    if (!user)
      return res.status(404).json({
        success: false,
        msg: "User not found.",
      });

    if (user._id != req.loggedUserId)
      return res.status(401).json({
        success: false,
        error: "Forbidden",
        msg: "You don't have permission to edit this user.",
      });

    await User.findByIdAndDelete(user._id);
    await Task.deleteMany({ IDuser: user._id });
    await Bill.deleteMany({ IDuser: user._id });
    await UserAchievements.deleteMany({ IDuser: user._id });
    await Streaks.deleteMany({ IDuser: user._id });
    await FavoriteTip.deleteMany({ IDuser: user._id });

    return res.status(200).json({
      success: true,
      msg: "User deleted successfully.",
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

exports.unlockAchievement = async (req, res) => {
  try {
      const idA = req.params.idA
      const achievement = await db.Achievements.findOne({ _id: idA }).exec();

      if (!achievement) {
          return res.status(404).json({
              success: false,
              msg: "Achievement not found",
          });
      }

      let unlocked = new UserAchievements({
          IDuser: req.loggedUserId,
          IDAchievements: idA
      });

      const existingAchievement = await UserAchievements.findOne({
          IDuser: req.loggedUserId,
          IDAchievements: idA
      }).exec();

      if (existingAchievement) {
          return res.status(400).json({
              success: false,
              msg: "Achievement is already unlocked",
          });
      }

      const newUnlocked = await unlocked.save();

      return res.status(201).json({
          success: true,
          msg: "New achievement unlocked!",
          data: newUnlocked,
      });
  } catch (error) {
      handleErrorResponse(res, error);
  }
}