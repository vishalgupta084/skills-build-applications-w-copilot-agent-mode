import mongoose from 'mongoose';

export interface IWorkout {
  title: string;
  description: string;
  durationMinutes: number;
  intensity: 'low' | 'medium' | 'high';
  createdAt: Date;
}

const workoutSchema = new mongoose.Schema<IWorkout>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    intensity: { type: String, required: true, enum: ['low', 'medium', 'high'] },
    createdAt: { type: Date, required: true, default: () => new Date() }
  },
  { timestamps: true }
);

const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);
export default Workout;
