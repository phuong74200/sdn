import mongoose from "mongoose";

export interface Nation {
  name: string;
  description: string;
}

const nationSchema = new mongoose.Schema({
  name: String,
  description: String,
});

export default mongoose.model<Nation & mongoose.Document>(
  "Nation",
  nationSchema
);
