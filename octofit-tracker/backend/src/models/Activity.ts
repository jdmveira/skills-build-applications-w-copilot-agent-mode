import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    completedAt: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Activity || mongoose.model('Activity', activitySchema);
