import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema({
  category: String,
  title: String,
  summary: String,
  content: String,
  url: String,
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.News || mongoose.model("News", NewsSchema);
