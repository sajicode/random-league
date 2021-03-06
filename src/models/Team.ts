import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
  team_name: {
    type: String,
    required: true,
    unique: true,
  },
  team_logo: {
    type: String,
    default: 'https://res.cloudinary.com/sajicode/image/upload/v1588995862/football-logo.png',
  },
  coach: {
    type: String,
    required: true,
  },
  stadium: {
    type: String,
    required: true,
  },
  fixtures: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'fixtures',
    },
  ],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('teams', teamSchema);
