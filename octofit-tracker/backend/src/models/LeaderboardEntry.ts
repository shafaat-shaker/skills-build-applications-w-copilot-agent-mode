import mongoose, { Schema, Document } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  userId: string;
  username: string;
  score: number;
  rank: number;
}

const LeaderboardEntrySchema = new Schema<ILeaderboardEntry>({
  userId: { type: String, required: true },
  username: { type: String, required: true },
  score: { type: Number, required: true },
  rank: { type: Number, required: true },
});

export default mongoose.model<ILeaderboardEntry>('LeaderboardEntry', LeaderboardEntrySchema);
