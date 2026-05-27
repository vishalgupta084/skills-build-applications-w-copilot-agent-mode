import mongoose from 'mongoose';

export interface ITeam {
  name: string;
  description: string;
  members: mongoose.Types.ObjectId[];
  createdAt: Date;
}

const teamSchema = new mongoose.Schema<ITeam>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, required: true, default: () => new Date() }
  },
  { timestamps: true }
);

const Team = mongoose.model<ITeam>('Team', teamSchema);
export default Team;
