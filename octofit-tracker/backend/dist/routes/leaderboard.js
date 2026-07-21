"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongoose_1 = __importDefault(require("mongoose"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const db = mongoose_1.default.connection.db;
    if (!db) {
        res.status(503).json({ message: 'Database not connected' });
        return;
    }
    const leaderboard = await db.collection('leaderboardentries').find({}).sort({ rank: 1 }).toArray();
    res.json({
        message: 'Leaderboard route ready',
        leaderboard,
    });
});
exports.default = router;
