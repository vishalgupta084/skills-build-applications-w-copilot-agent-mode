import mongoose from 'mongoose';

export interface IActivity {
  user: mongoose.Types.ObjectId;
  team: mongoose.Types.ObjectId;
  workout: mongoose.Types.ObjectId;
  activityDate: Date;
  durationMinutes: number;
  caloriesBurned: number;
  distanceKm?: number;
  notes: string;
}

const activitySchema = new mongoose.Schema<IActivity>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
    workout: { type: mongoose.Schema.Types.ObjectId, ref: 'Workout', required: true },
    activityDate: { type: Date, required: true, default: () => new Date() },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    distanceKm: { type: Number },
    notes: { type: String, default: '' }
  },
  { timestamps: true }
);

const Activity = mongoose.model<IActivity>('Activity', activitySchema);
export default Activity;
