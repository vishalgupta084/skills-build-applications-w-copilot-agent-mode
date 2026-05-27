import mongoose from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  role: string;
  team?: mongoose.Types.ObjectId;
  startedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true, default: 'athlete' },
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    startedAt: { type: Date, required: true, default: () => new Date() }
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>('User', userSchema);
export default User;
