"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const activity_1 = __importDefault(require("../models/activity"));
const leaderboard_1 = __importDefault(require("../models/leaderboard"));
const team_1 = __importDefault(require("../models/team"));
const user_1 = __importDefault(require("../models/user"));
const workout_1 = __importDefault(require("../models/workout"));
// Seed the octofit_db database with test data
const seedDatabase = async () => {
    await (0, database_1.connectDatabase)();
    console.log('Clearing existing collections...');
    await Promise.all([
        activity_1.default.deleteMany({}),
        leaderboard_1.default.deleteMany({}),
        team_1.default.deleteMany({}),
        user_1.default.deleteMany({}),
        workout_1.default.deleteMany({})
    ]);
    console.log('Creating teams...');
    const teams = await team_1.default.create([
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
    const users = await user_1.default.create([
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
    await team_1.default.updateOne({ _id: teams[0]._id }, { $set: { members: [users[0]._id, users[2]._id] } });
    await team_1.default.updateOne({ _id: teams[1]._id }, { $set: { members: [users[1]._id] } });
    console.log('Creating workouts...');
    const workouts = await workout_1.default.create([
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
    const activities = await activity_1.default.create([
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
    const leaderboard = await leaderboard_1.default.create([
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
