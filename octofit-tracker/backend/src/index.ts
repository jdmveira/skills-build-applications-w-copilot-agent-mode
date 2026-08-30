import express from 'express';
import cors from 'cors';
import './config/database';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get('/api/', (_req, res) => {
  res.json({ message: 'Octofit Tracker API' });
});

app.listen(PORT, () => {
  const codespaceName = process.env.CODESPACE_NAME;
  const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${PORT}`;
  console.log(`Octofit Tracker API listening at ${baseUrl}`);
});
