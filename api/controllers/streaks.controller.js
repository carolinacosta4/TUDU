const db = require("../models/index.js");
const config = require("../config/db.config.js");
const mongoose = require("mongoose");
const Streaks = db.Streaks;

const handleErrorResponse = (res, error) => {
    return res
        .status(500)
        .json({ success: false, msg: error.message || "Some error occurred." });
};

exports.getStreaksByUserId = async (req, res) => {
    try {
        const userId = req.params.idU;

        const streak = await Streaks.findOne({ IDuser: userId });

        if (!streak) {
            return res.status(404).json({
                success: false,
                msg: "Streak data not found for this user",
            });
        }

        return res.status(200).json({
            success: true,
            data: streak,
        });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};

exports.updateStreak = async (req, res) => {
    try {
        const userId = req.loggedUserId;
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);


        let streak = await Streaks.findOne({ _id: userId });

        if (!streak) {
            // Se não existir, cria o streak para o usuário
            streak = new Streaks({
                IDuser: userId,
                lastDateAccessed: today,
                streaks: 1,
            });
            await streak.save();

            return res.status(201).json({
                success: true,
                msg: "Streak initialized",
                data: streak,
            });
        }

        const lastAccessed = new Date(streak.lastDateAccessed);
        const accessedYesterday = lastAccessed.toDateString() === yesterday.toDateString();

        if (!accessedYesterday) {
            const tasksYesterday = await db.Task.find({
                IDuser: userId,
                startDate: { $lte: yesterday },
                endDate: { $gte: yesterday },
            });

            if (tasksYesterday.length > 0) {
                streak.streaks = 0;
            }
        }

        // Atualiza a última data de acesso para hoje
        streak.lastDateAccessed = today;

        // Incrementa o streak se acessou ontem
        if (accessedYesterday) {
            streak.streaks += 1;
        }

        await streak.save();

        return res.status(200).json({
            success: true,
            msg: "Streak updated",
            data: streak,
        });
    } catch (error) {
        handleErrorResponse(res, error);
    }
};
