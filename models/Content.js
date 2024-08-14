import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Content ||
  mongoose.model("Content", ContentSchema);
