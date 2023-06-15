import mongoose from "mongoose";

export interface Player {
  name: string;
  image: string;
  club: string;
  position: string;
  goals: number;
  isCaptain: boolean;
}

const playerSchema = new mongoose.Schema({
  name: String,
  image: String,
  club: String,
  position: String,
  goals: Number,
  isCaptain: Boolean,
});

export default mongoose.model<Player & mongoose.Document>(
  "Player",
  playerSchema
);
