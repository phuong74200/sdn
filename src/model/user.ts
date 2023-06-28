import mongoose from "mongoose";

export interface User {
  username: string;
  password: string;
  name: string;
  YOB: number;
  isAdmin: boolean;
}

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  YOB: { type: Number, required: true },
  isAdmin: { type: Boolean, required: true },
});

export default mongoose.model<User & mongoose.Document>("User", userSchema);
