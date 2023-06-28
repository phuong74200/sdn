import mongoose from "mongoose";
import { Nation } from "./nations";

export interface Player {
  name: string;
  image: string;
  career: string;
  position: string;
  goals: number;
  nation: Nation;
  isCaptain: boolean;
}

const playerSchema = new mongoose.Schema({
  name: String,
  image: String,
  position: String,
  career: String,
  goals: Number,
  nation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Nation",
    require: true,
  },
  isCaptain: Boolean,
});

export default mongoose.model<Player & mongoose.Document>(
  "Player",
  playerSchema
);
