import mongoose from 'mongoose';

export interface ILeaderboardEntry {
  user: mongoose.Types.ObjectId;
  team: mongoose.Types.ObjectId;
  points: number;
  rank: number;
  updatedAt: Date;
}

const leaderboardSchema = new mongoose.Schema<ILeaderboardEntry>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
    points: { type: Number, required: true },
    rank: { type: Number, required: true },
    updatedAt: { type: Date, required: true, default: () => new Date() }
  },
  { timestamps: true }
);

const Leaderboard = mongoose.model<ILeaderboardEntry>('Leaderboard', leaderboardSchema);
export default Leaderboard;
