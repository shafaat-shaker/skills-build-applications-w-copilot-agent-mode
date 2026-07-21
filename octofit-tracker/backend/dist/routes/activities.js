"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongoose_1 = __importDefault(require("mongoose"));
const Activity_1 = __importDefault(require("../models/Activity"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const db = mongoose_1.default.connection.db;
    if (!db) {
        res.status(503).json({ message: 'Database not connected' });
        return;
    }
    const activities = await db.collection('activities').find({}).toArray();
    res.json({
        message: 'Activities route ready',
        activities,
    });
});
router.post('/', async (req, res) => {
    const activity = await Activity_1.default.create(req.body);
    res.status(201).json({ message: 'Activity recorded', activity });
});
exports.default = router;
