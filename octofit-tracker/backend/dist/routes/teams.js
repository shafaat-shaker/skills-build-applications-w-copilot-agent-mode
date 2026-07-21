"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongoose_1 = __importDefault(require("mongoose"));
const Team_1 = __importDefault(require("../models/Team"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const db = mongoose_1.default.connection.db;
    if (!db) {
        res.status(503).json({ message: 'Database not connected' });
        return;
    }
    const teams = await db.collection('teams').find({}).toArray();
    res.json({
        message: 'Teams route ready',
        teams,
    });
});
router.post('/', async (req, res) => {
    const team = await Team_1.default.create(req.body);
    res.status(201).json({ message: 'Team created', team });
});
exports.default = router;
