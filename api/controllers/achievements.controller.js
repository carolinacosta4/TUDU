const db = require("../models/index.js");
const config = require("../config/db.config.js");
const mongoose = require("mongoose");
const Achievements = db.Achievements

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
        const achievements = await Achievements.find().exec();

        return res.status(200).json({
            success: true,
            data: achievements,
        });
    } catch (error) {
        handleErrorResponse(res, error);
    }
}


exports.create = async (req, res) => {
    try {
        const { name, cloudinary_id_image, cloudinary_id_lockedImage } = req.body;

        if (!name || !cloudinary_id_image || !cloudinary_id_lockedImage) {
            return res.status(400).json({
                success: false,
                msg: "Missing some required information"
            });
        }

        const existingAchievement = await Achievements.findOne({ name });
        if (existingAchievement) {
            return res.status(400).json({
                success: false,
                msg: "Achievement already exists"
            });
        }

        let image, lockedImage;
        try {
            image = await cloudinary.api.resource(cloudinary_id_image);
            lockedImage = await cloudinary.api.resource(cloudinary_id_lockedImage);
        } catch (error) {
            return res.status(404).json({
                success: false,
                msg: "Could not find images in Cloudinary",
                error: error.message
            });
        }

        const createdAt = new Date();
        const newAchievement = new Achievements({
            name,
            image: image.secure_url,
            cloudinary_id_image: cloudinary_id_image,
            lockedImage: lockedImage.secure_url,
            cloudinary_id_lockedImage: cloudinary_id_lockedImage,
            created_at: createdAt
        });


        const savedAchievement = await newAchievement.save();

        return res.status(201).json({
            success: true,
            msg: "Achievement created successfully.",
            data: savedAchievement
        });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

exports.deleteAchievement = async (req, res) => {
    let idA = req.params.idA
    try {
        const existingAchievement = await Achievements.findOne({ _id: idA });
        if (existingAchievement) {
            await Achievements.deleteOne(existingAchievement);
            return res.status(200).json({
                success: true,
                msg: 'Achievement deleted successfully.'
            });
        }
        else {
            return res.status(404).json({
                success: false,
                error: "Achievement fot found",
                msg: "The specified Achievement does not exist."
            });
        }
    } catch (error) {
        handleErrorResponse(res, error);
    }
}