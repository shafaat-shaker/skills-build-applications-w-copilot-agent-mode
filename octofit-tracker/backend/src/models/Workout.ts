import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  category: string;
  difficulty: string;
  durationMinutes: number;
}

const WorkoutSchema = new Schema<IWorkout>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  difficulty: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
});

export default mongoose.model<IWorkout>('Workout', WorkoutSchema);
