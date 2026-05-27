import { connectDatabase } from '../config/database';
import Activity from '../models/activity';
import Leaderboard from '../models/leaderboard';
import Team from '../models/team';
import User from '../models/user';
import Workout from '../models/workout';

// Seed the octofit_db database with test data
const seedDatabase = async () => {
  await connectDatabase();

  console.log('Clearing existing collections...');
  await Promise.all([
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Team.deleteMany({}),
    User.deleteMany({}),
    Workout.deleteMany({})
  ]);

  console.log('Creating teams...');
  const teams = await Team.create([
    {
      name: 'Team Apex',
      description: 'A competitive training group focused on speed and strength.',
      members: []
    },
    {
      name: 'Team Pulse',
      description: 'A community-driven team focused on endurance and consistency.',
      members: []
    }
  ]);

  console.log('Creating users...');
  const users = await User.create([
    {
      name: 'Ava Reynolds',
      email: 'ava.reynolds@example.com',
      role: 'athlete',
      team: teams[0]._id
    },
    {
      name: 'Jordan Miles',
      email: 'jordan.miles@example.com',
      role: 'athlete',
      team: teams[1]._id
    },
    {
      name: 'Maya Carter',
      email: 'maya.carter@example.com',
      role: 'coach',
      team: teams[0]._id
    }
  ]);

  await Team.updateOne({ _id: teams[0]._id }, { $set: { members: [users[0]._id, users[2]._id] } });
  await Team.updateOne({ _id: teams[1]._id }, { $set: { members: [users[1]._id] } });

  console.log('Creating workouts...');
  const workouts = await Workout.create([
    {
      title: 'HIIT Sprint',
      description: 'A fast-paced interval workout for speed and power.',
      durationMinutes: 20,
      intensity: 'high'
    },
    {
      title: 'Strength Circuit',
      description: 'A full-body strength session with compound movements.',
      durationMinutes: 45,
      intensity: 'medium'
    },
    {
      title: 'Recovery Ride',
      description: 'A gentle ride to support recovery and endurance.',
      durationMinutes: 60,
      intensity: 'low'
    }
  ]);

  console.log('Creating activities...');
  const activities = await Activity.create([
    {
      user: users[0]._id,
      team: teams[0]._id,
      workout: workouts[0]._id,
      activityDate: new Date(Date.now() - 1000 * 60 * 60 * 24),
      durationMinutes: 22,
      caloriesBurned: 380,
      distanceKm: 4.2,
      notes: 'Strong opening sprint set with consistent intervals.'
    },
    {
      user: users[1]._id,
      team: teams[1]._id,
      workout: workouts[2]._id,
      activityDate: new Date(Date.now() - 1000 * 60 * 60 * 48),
      durationMinutes: 60,
      caloriesBurned: 420,
      distanceKm: 25,
      notes: 'Easy recovery ride with positive pacing.'
    },
    {
      user: users[0]._id,
      team: teams[0]._id,
      workout: workouts[1]._id,
      activityDate: new Date(Date.now() - 1000 * 60 * 60 * 72),
      durationMinutes: 48,
      caloriesBurned: 540,
      notes: 'Quality strength circuit with progressive loading.'
    }
  ]);

  console.log('Creating leaderboard entries...');
  const leaderboard = await Leaderboard.create([
    {
      user: users[0]._id,
      team: teams[0]._id,
      points: 1250,
      rank: 1
    },
    {
      user: users[1]._id,
      team: teams[1]._id,
      points: 980,
      rank: 2
    },
    {
      user: users[2]._id,
      team: teams[0]._id,
      points: 860,
      rank: 3
    }
  ]);

  console.log('Sample data inserted:');
  console.log(`- teams: ${teams.length}`);
  console.log(`- users: ${users.length}`);
  console.log(`- workouts: ${workouts.length}`);
  console.log(`- activities: ${activities.length}`);
  console.log(`- leaderboard entries: ${leaderboard.length}`);
  console.log('Seed the octofit_db database with test data');

  process.exit(0);
};

seedDatabase().catch((error) => {
  console.error('Failed to seed database:', error);
  process.exit(1);
});
