import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    date: { type: String, required: true },
    type: { type: String, required: true }, // e.g. "Training", "Fellowship", etc.
    image: { type: String, required: true }, // image URL or uploaded path
    icon: { type: String, required: true }, // e.g. "Leaf", "Users", "Palette"
    category: { type: String, required: true }, // e.g. "Opportunity" or "PastEvent"
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);
