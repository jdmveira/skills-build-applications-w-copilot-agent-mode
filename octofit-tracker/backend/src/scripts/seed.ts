import mongoose from 'mongoose';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Team from '../models/Team';
import User from '../models/User';
import Workout from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    await User.insertMany([
      {
        username: 'maya_runner',
        email: 'maya@example.com',
        displayName: 'Maya Patel',
        fitnessGoal: 'Run a half marathon',
        preferredActivity: 'Running',
      },
      {
        username: 'leo_lifts',
        email: 'leo@example.com',
        displayName: 'Leo Martinez',
        fitnessGoal: 'Build strength',
        preferredActivity: 'Weight training',
      },
      {
        username: 'nora_cycles',
        email: 'nora@example.com',
        displayName: 'Nora Chen',
        fitnessGoal: 'Improve endurance',
        preferredActivity: 'Cycling',
      },
    ]);

    await Team.insertMany([
      {
        name: 'Cardio Crew',
        mascot: 'Lightning Bolt',
        captain: 'Maya Patel',
        members: ['Maya Patel', 'Nora Chen'],
        weeklyGoalMinutes: 540,
      },
      {
        name: 'Iron Squad',
        mascot: 'Kettlebell',
        captain: 'Leo Martinez',
        members: ['Leo Martinez'],
        weeklyGoalMinutes: 360,
      },
    ]);

    await Activity.insertMany([
      {
        user: 'Maya Patel',
        type: 'Outdoor run',
        durationMinutes: 48,
        caloriesBurned: 430,
        completedAt: new Date('2026-08-26T13:30:00Z'),
      },
      {
        user: 'Leo Martinez',
        type: 'Upper body strength',
        durationMinutes: 55,
        caloriesBurned: 370,
        completedAt: new Date('2026-08-27T22:00:00Z'),
      },
      {
        user: 'Nora Chen',
        type: 'Interval cycling',
        durationMinutes: 62,
        caloriesBurned: 520,
        completedAt: new Date('2026-08-28T12:45:00Z'),
      },
    ]);

    await Leaderboard.insertMany([
      {
        rank: 1,
        user: 'Nora Chen',
        team: 'Cardio Crew',
        points: 1280,
        totalActiveMinutes: 310,
      },
      {
        rank: 2,
        user: 'Maya Patel',
        team: 'Cardio Crew',
        points: 1195,
        totalActiveMinutes: 285,
      },
      {
        rank: 3,
        user: 'Leo Martinez',
        team: 'Iron Squad',
        points: 1040,
        totalActiveMinutes: 240,
      },
    ]);

    await Workout.insertMany([
      {
        title: '5K Tempo Builder',
        focusArea: 'Cardio endurance',
        difficulty: 'Intermediate',
        estimatedMinutes: 35,
        exercises: ['Warm-up jog', 'Tempo intervals', 'Cooldown walk'],
      },
      {
        title: 'Full Body Strength Circuit',
        focusArea: 'Strength',
        difficulty: 'Beginner',
        estimatedMinutes: 40,
        exercises: ['Goblet squats', 'Push-ups', 'Dumbbell rows', 'Plank holds'],
      },
      {
        title: 'Recovery Mobility Flow',
        focusArea: 'Mobility',
        difficulty: 'All levels',
        estimatedMinutes: 25,
        exercises: ['Hip openers', 'Thoracic rotations', 'Hamstring flossing'],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
