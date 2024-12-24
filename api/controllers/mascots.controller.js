const db = require("../models/index.js");
const config = require("../config/db.config.js");
const mongoose = require("mongoose");
const Mascots = db.Mascot;


const handleErrorResponse = (res, error) => {
    return res
        .status(500)
        .json({ success: false, msg: error.message || "Some error occurred." });
};

const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: config.C_CLOUD_NAME,
    api_key: config.C_API_KEY,
    api_secret: config.C_API_SECRET
});

exports.findAll = async (req, res) => {
    try {
        const mascots = await Mascots.find().exec();

        if (!mascots) {
            return res.status(200).json({
                success: false,
                msg: "No mascots found",
            });
        }

        return res.status(200).json({
            success: true,
            data: mascots,
        });
    } catch (error) {
        handleErrorResponse(res, error);
    }
}