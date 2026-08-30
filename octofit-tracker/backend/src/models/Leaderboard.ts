import mongoose from 'mongoose';

const leaderboardSchema = new mongoose.Schema(
  {
    rank: { type: Number, required: true, unique: true },
    user: { type: String, required: true },
    team: { type: String, required: true },
    points: { type: Number, required: true },
    totalActiveMinutes: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Leaderboard || mongoose.model('Leaderboard', leaderboardSchema);
