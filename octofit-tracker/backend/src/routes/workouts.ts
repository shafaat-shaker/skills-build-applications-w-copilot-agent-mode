import { Router } from 'express';
import mongoose from 'mongoose';
import Workout from '../models/Workout';

const router = Router();

router.get('/', async (_req, res) => {
  const db = mongoose.connection.db;
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
  const workout = await Workout.create(req.body);
  res.status(201).json({ message: 'Workout created', workout });
});

export default router;

