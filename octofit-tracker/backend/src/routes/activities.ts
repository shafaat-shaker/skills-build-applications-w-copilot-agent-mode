import { Router } from 'express';
import mongoose from 'mongoose';
import Activity from '../models/Activity';

const router = Router();

router.get('/', async (_req, res) => {
  const db = mongoose.connection.db;
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
  const activity = await Activity.create(req.body);
  res.status(201).json({ message: 'Activity recorded', activity });
});

export default router;
