import mongoose from "mongoose";

export interface User {
  username: string;
  password: string;
  name: string;
  YOB: number;
  isAdmin: boolean;
  googleId: string;
}

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  YOB: { type: Number, required: true },
  isAdmin: { type: Boolean, required: true },
  googleId: { type: String },
});

export default mongoose.model<User & mongoose.Document>("User", userSchema);
