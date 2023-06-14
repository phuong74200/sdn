import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  name: String,
  image: String,
  club: String,
  position: String,
  goals: Number,
  isCaptain: Boolean,
});

export default mongoose.model("Player", playerSchema);
