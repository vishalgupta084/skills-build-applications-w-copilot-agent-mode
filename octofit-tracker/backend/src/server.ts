import express from 'express';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';
import { connectDatabase } from './config/database';

const app = express();
const PORT = Number(process.env.PORT || 8000);
const CODESPACE_NAME = process.env.CODESPACE_NAME;
const BASE_URL = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : `http://localhost:${PORT}`;

app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.get('/api', (_req, res) => {
  res.json({
    message: 'OctoFit Tracker API is running',
    endpoints: [
      '/api/users',
      '/api/teams',
      '/api/activities',
      '/api/leaderboard',
      '/api/workouts'
    ]
  });
});

const startServer = async () => {
  try {
    await connectDatabase();
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`OctoFit Tracker backend running at ${BASE_URL}`);
      if (CODESPACE_NAME) {
        console.log(`Codespaces URL: ${BASE_URL}`);
      }
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();