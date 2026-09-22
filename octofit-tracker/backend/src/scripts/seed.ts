import mongoose from 'mongoose'
import { connectionString } from '../config/database.js'
import Activity from '../models/activity.js'
import Leaderboard from '../models/leaderboard.js'
import Team from '../models/team.js'
import User from '../models/user.js'
import Workout from '../models/workout.js'

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    console.log('Seed the octofit_db database with test data')
    await mongoose.connect(connectionString)

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ])

    const users = await User.create([
      { name: 'Avery Johnson', email: 'avery@example.com', age: 16, fitnessLevel: 'intermediate' },
      { name: 'Jordan Lee', email: 'jordan@example.com', age: 15, fitnessLevel: 'beginner' },
      { name: 'Morgan Smith', email: 'morgan@example.com', age: 17, fitnessLevel: 'advanced' },
    ])

    await Team.create([
      { name: 'Trail Blazers', color: '#2f855a', members: [users[0]._id, users[1]._id] },
      { name: 'Peak Performers', color: '#dd6b20', members: [users[2]._id] },
    ])

    await Activity.create([
      {
        user: users[0]._id,
        type: 'running',
        durationMinutes: 32,
        distanceKm: 5.1,
        calories: 410,
        completedAt: new Date('2026-09-19T16:30:00Z'),
      },
      {
        user: users[1]._id,
        type: 'walking',
        durationMinutes: 45,
        distanceKm: 3.4,
        calories: 220,
        completedAt: new Date('2026-09-20T10:00:00Z'),
      },
      {
        user: users[2]._id,
        type: 'strength',
        durationMinutes: 50,
        calories: 360,
        completedAt: new Date('2026-09-20T17:15:00Z'),
      },
    ])

    await Leaderboard.create([
      { user: users[0]._id, points: 860, rank: 2, period: 'September 2026' },
      { user: users[1]._id, points: 540, rank: 3, period: 'September 2026' },
      { user: users[2]._id, points: 1120, rank: 1, period: 'September 2026' },
    ])

    await Workout.create([
      {
        title: 'Steady Starter Run',
        description: 'A conversational-paced run for building aerobic endurance.',
        difficulty: 'beginner',
        durationMinutes: 25,
        exercises: ['5-minute walk warmup', '15-minute easy run', '5-minute cool down'],
      },
      {
        title: 'Full Body Circuit',
        description: 'A balanced circuit focused on strength and movement quality.',
        difficulty: 'intermediate',
        durationMinutes: 35,
        exercises: ['Squats', 'Push-ups', 'Reverse lunges', 'Plank'],
      },
    ])

    console.log('Database seeding complete')
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exitCode = 1
  } finally {
    await mongoose.disconnect()
  }
}

seedDatabase();
