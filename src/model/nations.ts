import mongoose from "mongoose";

export interface Nation {
  name: string;
}

const nationSchema = new mongoose.Schema({
  name: String,
});

export default mongoose.model<Nation & mongoose.Document>(
  "Nation",
  nationSchema
);
