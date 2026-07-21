import { Router } from 'express';
import mongoose from 'mongoose';
import LeaderboardEntry from '../models/LeaderboardEntry';

const router = Router();

router.get('/', async (_req, res) => {
  const db = mongoose.connection.db;
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

export default router;
