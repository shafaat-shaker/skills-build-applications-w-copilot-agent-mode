"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("../models/User"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const db = mongoose_1.default.connection.db;
    if (!db) {
        res.status(503).json({ message: 'Database not connected' });
        return;
    }
    const users = await db.collection('users').find({}).toArray();
    res.json({
        message: 'Users route ready',
        users,
    });
});
router.post('/', async (req, res) => {
    const user = await User_1.default.create(req.body);
    res.status(201).json({ message: 'User created', user });
});
exports.default = router;
