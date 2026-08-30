import express from 'express';
import cors from 'cors';
import './config/database';
import Activity from './models/Activity';
import Leaderboard from './models/Leaderboard';
import Team from './models/Team';
import User from './models/User';
import Workout from './models/Workout';

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

app.get('/api/', (_req, res) => {
  res.json({ message: 'Octofit Tracker API' });
});

app.get('/api/users/', async (_req, res) => {
  const users = await User.find().sort({ displayName: 1 });
  res.json(users);
});

app.get('/api/teams/', async (_req, res) => {
  const teams = await Team.find().sort({ name: 1 });
  res.json(teams);
});

app.get('/api/activities/', async (_req, res) => {
  const activities = await Activity.find().sort({ completedAt: -1 });
  res.json(activities);
});

app.get('/api/leaderboard/', async (_req, res) => {
  const leaderboard = await Leaderboard.find().sort({ rank: 1 });
  res.json(leaderboard);
});

app.get('/api/workouts/', async (_req, res) => {
  const workouts = await Workout.find().sort({ title: 1 });
  res.json(workouts);
});

app.listen(PORT, () => {
  const codespaceName = process.env.CODESPACE_NAME;
  const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
  console.log(`Octofit Tracker API listening at ${baseUrl}`);
});
