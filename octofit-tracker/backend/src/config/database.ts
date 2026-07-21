import mongoose from 'mongoose';

export async function connectToDatabase() {
  const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

  try {
    await mongoose.connect(connectionString, { dbName: 'octofit_db' });
    console.log('Connected to octofit_db');
  } catch (error) {
    console.error('Error connecting to octofit_db:', error);
    throw error;
  }
}

export default mongoose;
