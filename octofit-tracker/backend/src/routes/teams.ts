import { Router } from 'express';
import mongoose from 'mongoose';
import Team from '../models/Team';

const router = Router();

router.get('/', async (_req, res) => {
  const db = mongoose.connection.db;
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
  const team = await Team.create(req.body);
  res.status(201).json({ message: 'Team created', team });
});

export default router;
