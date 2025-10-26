import { connectDB } from "./dbConnect";
import News from "@/models/News";

export const deleteOldNews = async () => {
  await connectDB();
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 30);
  await News.deleteMany({ date: { $lt: cutoff } });
  console.log("🧹 Deleted posts older than 30 days");
};
