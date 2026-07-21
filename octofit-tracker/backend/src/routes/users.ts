import { Router } from 'express';
import mongoose from 'mongoose';
import User from '../models/User';

const router = Router();

router.get('/', async (_req, res) => {
  const db = mongoose.connection.db;
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
  const user = await User.create(req.body);
  res.status(201).json({ message: 'User created', user });
});

export default router;
