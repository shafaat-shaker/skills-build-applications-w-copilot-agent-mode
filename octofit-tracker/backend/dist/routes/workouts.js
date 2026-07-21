"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongoose_1 = __importDefault(require("mongoose"));
const Workout_1 = __importDefault(require("../models/Workout"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const db = mongoose_1.default.connection.db;
    if (!db) {
        res.status(503).json({ message: 'Database not connected' });
        return;
    }
    const workouts = await db.collection('workouts').find({}).toArray();
    res.json({
        message: 'Workouts route ready',
        workouts,
    });
});
router.post('/', async (req, res) => {
    const workout = await Workout_1.default.create(req.body);
    res.status(201).json({ message: 'Workout created', workout });
});
exports.default = router;
