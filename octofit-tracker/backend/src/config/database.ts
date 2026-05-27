import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

export const connectDatabase = async () => {
  mongoose.set('strictQuery', true);
  await mongoose.connect(MONGODB_URI);
  console.log(`Connected to MongoDB at ${MONGODB_URI}`);
};
