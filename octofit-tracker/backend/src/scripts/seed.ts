import mongoose from 'mongoose';
import User from '../models/User';
import Team from '../models/Team';
import Activity from '../models/Activity';
import LeaderboardEntry from '../models/LeaderboardEntry';
import Workout from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      { name: 'Maya Chen', email: 'maya@example.com', fitnessGoal: 'Improve endurance', level: 'Intermediate' },
      { name: 'Jordan Lee', email: 'jordan@example.com', fitnessGoal: 'Build strength', level: 'Advanced' },
      { name: 'Ava Patel', email: 'ava@example.com', fitnessGoal: 'Increase flexibility', level: 'Beginner' },
    ]);

    const teams = await Team.insertMany([
      { name: 'Trailblazers', sport: 'Running', members: ['maya@example.com', 'jordan@example.com'] },
      { name: 'Core Squad', sport: 'CrossFit', members: ['ava@example.com'] },
    ]);

    await Activity.insertMany([
      { userId: users[0]._id.toString(), type: 'Run', durationMinutes: 35, date: new Date('2026-07-15') },
      { userId: users[1]._id.toString(), type: 'Strength', durationMinutes: 50, date: new Date('2026-07-16') },
      { userId: users[2]._id.toString(), type: 'Yoga', durationMinutes: 30, date: new Date('2026-07-17') },
    ]);

    await LeaderboardEntry.insertMany([
      { userId: users[0]._id.toString(), username: 'maya', score: 980, rank: 1 },
      { userId: users[1]._id.toString(), username: 'jordan', score: 945, rank: 2 },
      { userId: users[2]._id.toString(), username: 'ava', score: 900, rank: 3 },
    ]);

    await Workout.insertMany([
      { name: 'HIIT Cardio', category: 'Cardio', difficulty: 'Intermediate', durationMinutes: 25 },
      { name: 'Upper Body Sculpt', category: 'Strength', difficulty: 'Advanced', durationMinutes: 40 },
      { name: 'Mobility Flow', category: 'Recovery', difficulty: 'Beginner', durationMinutes: 20 },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
